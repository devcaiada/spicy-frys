const sampleRate = 44100;

const clamp16 = (value: number) => Math.max(-32768, Math.min(32767, value));

const toBase64 = (bytes: Uint8Array) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let output = '';

  for (let index = 0; index < bytes.length; index += 3) {
    const first = bytes[index] ?? 0;
    const second = bytes[index + 1] ?? 0;
    const third = bytes[index + 2] ?? 0;

    const combined = (first << 16) | (second << 8) | third;
    const padLength = bytes.length - index;

    output += alphabet[(combined >> 18) & 63];
    output += alphabet[(combined >> 12) & 63];
    output += padLength > 1 ? alphabet[(combined >> 6) & 63] : '=';
    output += padLength > 2 ? alphabet[combined & 63] : '=';
  }

  return output;
};

const writeString = (view: DataView, offset: number, value: string) => {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
};

const buildWavDataUri = (
  durationInSeconds: number,
  generator: (sampleIndex: number, totalSamples: number) => number,
) => {
  const totalSamples = Math.max(1, Math.floor(durationInSeconds * sampleRate));
  const audioData = new Int16Array(totalSamples);

  for (let index = 0; index < totalSamples; index += 1) {
    audioData[index] = clamp16(generator(index, totalSamples) * 32767);
  }

  const buffer = new ArrayBuffer(44 + audioData.byteLength);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + audioData.byteLength, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, audioData.byteLength, true);

  const bytes = new Uint8Array(buffer);
  bytes.set(new Uint8Array(audioData.buffer), 44);

  return `data:audio/wav;base64,${toBase64(bytes)}`;
};

const smoothEnvelope = (progress: number, attack = 0.15, release = 0.15) => {
  const attackGain = Math.min(1, progress / Math.max(0.001, attack));
  const releaseGain = Math.min(1, (1 - progress) / Math.max(0.001, release));

  return Math.min(attackGain, releaseGain);
};

export const createHissDataUri = () => {
  return buildWavDataUri(1.25, (sampleIndex, totalSamples) => {
    const progress = sampleIndex / totalSamples;
    const wobble = Math.sin(progress * Math.PI * 2 * 43) * 0.12;
    const noise = (Math.random() * 2 - 1) * 0.28;
    const rumble = Math.sin(progress * Math.PI * 2 * 2.5) * 0.05;

    return (noise + wobble + rumble) * smoothEnvelope(progress, 0.03, 0.08);
  });
};

export const createStartupDataUri = () => {
  return buildWavDataUri(0.85, (sampleIndex, totalSamples) => {
    const progress = sampleIndex / totalSamples;
    const pop = Math.exp(-progress * 8) * Math.sin(progress * Math.PI * 2 * 58);
    const whirr = Math.sin(progress * Math.PI * 2 * 118) * 0.07;
    const thump = Math.sin(progress * Math.PI * 2 * 2) * 0.14;

    return (pop * 0.7 + whirr + thump) * smoothEnvelope(progress, 0.01, 0.2);
  });
};

export const createAggressiveStaticDataUri = (durationInSeconds = 2.5) => {
  return buildWavDataUri(durationInSeconds, (sampleIndex, totalSamples) => {
    const progress = sampleIndex / totalSamples;
    // Balanced tape static and CRT hum
    const whiteNoise = (Math.random() * 2 - 1) * 0.45;
    const buzz60Hz = Math.sin(progress * Math.PI * 2 * 60 * durationInSeconds) * 0.18;
    const buzz120Hz = Math.sin(progress * Math.PI * 2 * 120 * durationInSeconds) * 0.12;
    const harshFuzz = Math.sin(progress * Math.PI * 2 * 2800 * durationInSeconds) * 0.08;
    const crackle = Math.random() > 0.95 ? (Math.random() * 2 - 1) * 0.25 : 0;

    const raw = (whiteNoise + buzz60Hz + buzz120Hz + harshFuzz + crackle) * 0.7;
    const clipped = Math.max(-0.85, Math.min(0.85, raw));

    // Abrupt envelope: instant attack, holds until the last frame where it cuts off instantly
    const cutEnvelope = progress > 0.96 ? Math.max(0, 1 - (progress - 0.96) / 0.04) : 1;

    return clipped * cutEnvelope;
  });
};

