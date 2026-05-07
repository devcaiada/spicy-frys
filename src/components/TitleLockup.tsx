type TitleLockupProps = {
  title: string;
  accent: string;
  scale: number;
};

export const TitleLockup = ({title, accent, scale}: TitleLockupProps) => {
  return (
    <div className="title-lockup" style={{transform: `scale(${scale})`}}>
      <div className="title-lockup__eyebrow" style={{color: accent}}>
        looping animation kit
      </div>
      <div className="title-lockup__title">{title}</div>
    </div>
  );
};
