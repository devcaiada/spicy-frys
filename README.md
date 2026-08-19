# 🍟 Spicy Frys (`Спайси Фрайс`)

[![Remotion](https://img.shields.io/badge/Remotion-v4.0+-blue?logo=react&style=flat-square)](https://www.remotion.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.8+-3178c6?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Aesthetic](https://img.shields.io/badge/Aesthetic-80s_Soviet_Brutalism-b86754?style=flat-square)](#-identidade-e-estética-visual)

> **Lead Video Engineer System & Automated Remotion Pipeline**  
> Dedicated automated assembly line producing satirical heavy-punk/metal music videos with a strict **80s Eastern Bloc Soviet Brutalism** aesthetic, mundane corporate satire, muted pastel color matrix, procedural film grain, and heavy CRT/VHS degradation.

---

## 📑 Tabela de Conteúdos
- [📻 Identidade e Estética Visual](#-identidade-e-estética-visual)
- [📐 Regras de Ouro da Produção](#-regras-de-ouro-da-produção)
- [🛠️ Pipeline de Assets](#️-pipeline-de-assets)
- [🎬 Arquitetura do Vídeo](#-arquitetura-do-vídeo)
- [🔄 Motor de Variação de Clipes (Repetition Engine)](#-motor-de-variação-de-clipes-repetition-engine)
- [📺 Camada de Degradação Analógica (Soviet CRT & Noise)](#-camada-de-degradação-analógica-soviet-crt--noise)
- [⚡ Encerramento Obrigatório (The Outro)](#-encerramento-obrigatório-the-outro)
- [📂 Estrutura de Diretórios](#-estrutura-de-diretórios)
- [🚀 Instalação e Execução](#-instalação-e-execução)
- [🎼 Como Produzir Novos Vídeos](#-como-produzir-novos-vídeos)

---

## 📻 Identidade e Estética Visual

- **Canal / Marca**: **Spicy Frys** (`Спайси Фрайс`)
- **Gênero Musical**: Satirical heavy-punk / high-gain metal com vocais distorcidos e alta intensidade rítmica.
- **Identidade Visual**:
  - **Soviet Brutalism Anos 80**: Arquitetura monolítica de concreto, burocracia industrial soviética, propaganda corporativa mundana, reuniões de diretoria absurdas e alienígenas engravatados.
  - **Paleta de Cores Muted Pastel**: Tons desbotados pelo tempo (concreto lavado `#8c8e88`, terracota oxidado `#b86754`, sálvia industrial `#9aa89b`, ardósia escurecida `#5b6870`, mostarda pálido `#d4b46a`, ciano lavado `#78a3a0`).
  - **Desgaste Analógico**: Tubos CRT curvados, linhas de varredura (*scanlines*), sangramento cromático RGB, ruído de fita magnética e barras de rastreamento horizontal VHS (*tracking lines*).

---

## 📐 Regras de Ouro da Produção

1. 🚫 **Início Instantâneo (Zero Intro / Zero Logos)**:
   - O videoclipe começa **imediatamente no frame 0** com o primeiro acorde da música e corte seco no primeiro vídeo. Não há vinheta ou logotipo inicial.
2. 🚫 **Proibição Estrita de Letras na Tela (No Lyrics)**:
   - Os visuais devem permanecer 100% limpos de legendas ou textos para preservar a atmosfera surreal e cinematográfica.
3. 🎬 **Ordenação Narrativa Automática (Narrative Sorter)**:
   - Os clipes são organizados em um arco temático (Ambientação $\rightarrow$ Reunião/Lobby $\rightarrow$ Rotina/Burocracia/Trabalho $\rightarrow$ Clímax com solo de guitarra).
4. 🔄 **Motor de Variações nos Assets Repetidos**:
   - Clipes que se repetem recebem transformações dinâmicas (*zoom contínuo, mirror flip, static crop, heavy texture*) para evitar monotonia.
5. 📁 **Nomenclatura Automática dos Renders**:
   - Os arquivos finais exportados recebem automaticamente o nome exato da música (ex: `renders/Intergalactic Lobbyists.mp4`).

---

## 🛠️ Pipeline de Assets

| Componente | Origem | Especificações & Restrições |
|---|---|---|
| **Áudio** | **Suno AI** (`.wav`, `.mp3`) | Faixas punk/metal de alto ganho com duração dinâmica (frequentemente > 180 segundos). A timeline do Remotion calcula a duração exata a partir dos metadados do arquivo. |
| **Visuais** | **Google Flow** (`.mp4`) | Clipes curtos gerados por IA. **LIMITE CRÍTICO: Máximo de 8 segundos por clipe**. |
| **Engine** | **Remotion** (React 19 + TypeScript) | Montagem programática, sincronização matemática com BPM/bateria, cortes secos (*hard cuts*), ruído procedural via código e shaders CSS. |

---

## 🎬 Arquitetura do Vídeo

- **Formato**: Widescreen 16:9 (1920x1080) @ 30 FPS.
- **Estilo de Edição & Pacing**:
  - **Hard Cuts no Tempo da Bateria**: Cortes secos cravados nas batidas de bumbo e caixa (*snare/kick*), calculados com base no BPM da faixa (padrão: 140 BPM).
  - **Frequência dos Cortes**: Transições a cada 4 a 8 segundos para respeitar o teto de 8 segundos do Google Flow.
  - **Transições VHS Splice**: Simulação de emenda de fita magnética defeituosa e salto horizontal de quadro nos pontos de corte.

---

## 🔄 Motor de Variação de Clipes (Repetition Engine)

Para cobrir músicas longas sem repetições visuais estáticas, o `BeatSyncedSequencer` aplica transformações programáticas por ciclo:

```
[Ciclo 0] -> Enquadramento Original (Scale 1.03)
[Ciclo 1] -> Slow Push / Dynamic Zoom-In (Scale 1.06 -> 1.28)
[Ciclo 2] -> Mirror Punch Horizontal (ScaleX -1, Scale 1.18 + Saturation Boost)
[Ciclo 3] -> Static Detail Crop (Scale 1.38 + Central Framing)
[Ciclo 4] -> Heavy VHS Texture & Micro-Jitter Analógico
```

---

## 📺 Camada de Degradação Analógica (Soviet CRT & Noise)

A composição utiliza uma camada de pós-processamento procedural desenvolvida em React:

- **`SovietCRTWrapper.tsx`**: Aplica matriz de filtros CSS (`sepia`, `contrast`, `saturate`, `brightness`, `hue-rotate`), curvatura CRT e sangramento RGB.
- **`NoiseCanvasOverlay.tsx`**: Gera granulação e estática de fita magnética em tempo real utilizando `@remotion/noise` (`noise2D`), eliminando vídeos de overlay pesados.
- **`VHSSpliceTransition.tsx`**: Injeta rasgos de quadro e desvios cromáticos no milissegundo exato de cada *hard cut*.

---

## ⚡ Encerramento Obrigatório (The Outro)

Todo vídeo termina com o encerramento canônico do canal:
1. **Título Brutalista**: Texto **"Спайси Фрайс"** em tipografia industrial monumental (`Anton` / Google Fonts) com carimbos oficiais em cirílico do *Министерство Тяжелого Панка*.
2. **Chiado de Estática Calibrado**: Efeito sonoro de corte de sinal analógico sintetizado via código em [`src/lib/audio.ts`](file:///c:/Users/caiop/DIO/spicy-frys/src/lib/audio.ts) ajustado para volume confortável (`0.12`).
3. **Blackout Abrupto**: Corte seco imediato para tela preta nos últimos frames, finalizando a transmissão de forma crua.

---

## 📂 Estrutura de Diretórios

```text
spicy-frys/
├── assets/                          # Assets brutos de entrada
│   ├── videos/                      # Clipes Google Flow (ex: intergalactic-lobbyists/)
│   ├── musics/                      # Faixas Suno AI (ex: Intergalactic Lobbyists.wav)
│   └── logo/                        # Identidade do canal
├── public/assets/                   # Espelho estático público (gerado automaticamente)
├── renders/                         # Saída dos vídeos renderizados em MP4
├── scripts/
│   ├── sync-assets.mjs              # Organizador narrativo e gerador do manifesto
│   └── render-video.mjs             # Executor de renderização com nome dinâmico
├── src/
│   ├── components/
│   │   ├── effects/                 # Shaders CRT, ruído procedural e emendas VHS
│   │   │   ├── SovietCRTWrapper.tsx
│   │   │   ├── NoiseCanvasOverlay.tsx
│   │   │   └── VHSSpliceTransition.tsx
│   │   ├── outro/                   # Encerramento "Спайси Фрайс" + estática
│   │   │   └── SovietOutro.tsx
│   │   ├── sequencer/               # Sequenciador rítmico com motor de variações
│   │   │   └── BeatSyncedSequencer.tsx
│   │   └── metalfi/                 # Gerenciador de áudio mestre
│   ├── config/                      # Configurações de vídeo e manifesto de assets
│   │   ├── metalfi.ts
│   │   └── spicyFrysAssets.ts
│   ├── lib/                         # Síntese de áudio procedural e matemática de BPM
│   │   ├── audio.ts
│   │   └── beatSync.ts
│   ├── styles/                      # CSS global e variáveis de cor soviéticas
│   │   └── global.css
│   ├── compositions/                # Composições Remotion (SpicyFrysMetalFi)
│   └── Root.tsx                     # Registro raiz de composições
├── package.json
└── tsconfig.json
```

---

## 🚀 Instalação e Execução

### 1. Instalação das Dependências
```bash
npm install
```

### 2. Abrir o Remotion Studio (Preview em Tempo Real)
```bash
npm run dev
```
*Abre o estúdio interativo em `http://localhost:3000` permitindo navegar frame a frame pela timeline.*

### 3. Renderizar o Videoclipe Completo (16:9 Widescreen)
```bash
npm run render
```
*Sincroniza os assets, ordena os clipes narrativamente, detecta a duração do áudio e salva o arquivo final em `renders/[Nome da Música].mp4`.*

### 4. Renderizar os YouTube Shorts (9:16 Vertical)
```bash
npm run render:shorts
```
*Gera automaticamente 2 Shorts em formato 9:16 (1080x1920) derivados dos melhores momentos da faixa (Abertura/Burocracia e Clímax/Solo de Guitarra) esticados/ajustados sem tarjas pretas e salvos em `renders/[Nome da Música] - Short 1.mp4` e `renders/[Nome da Música] - Short 2.mp4`.*

### 5. Transcrever Letras com IA (Whisper)
```bash
# Instalar dependências Python (uma única vez)
pip install -r requirements.txt

# Gerar JSON de legendas sincronizado
npm run lyrics
```
*Executa o Whisper localmente sobre a música em `assets/musics/`, detecta os tempos exatos e salva o JSON em `assets/lyrics/[Nome da Música].json`. Opcionalmente, adicione o arquivo de texto `assets/lyrics/[Nome da Música].txt` com a letra oficial do Suno para guiar a transcrição com 100% de fidelidade.*

### 6. Checagem de Tipos TypeScript
```bash
npm run typecheck
```

---

## 🎼 Como Produzir Novos Vídeos

1. **Adicione a Música:** Coloque o arquivo gerado no Suno (`.wav` ou `.mp3`) dentro de `assets/musics/`.
2. **Adicione os Vídeos:** Crie uma pasta dentro de `assets/videos/` (ex: `assets/videos/nome-da-musica/`) e adicione todos os clipes de até 8 segundos gerados no Google Flow.
3. **(Opcional) Gere as Legendas com Whisper:**
   ```bash
   npm run lyrics
   ```
4. **Sincronize e Renderize:**
   ```bash
   npm run render         # Vídeo completo 16:9
   npm run render:shorts  # 2 Shorts verticais 9:16
   ```
5. O Remotion automaticamente:
   - Identificará o título da música e sua duração exata em quadros;
   - Carregará e sincronizará as legendas de teletexto analógico (se o JSON existir);
   - Ordenará os vídeos pelo fluxo narrativo temático;
   - Aplicará os cortes secos no ritmo de 140 BPM com variações nos clipes repetidos;
   - Renderizará a estética completa CRT Soviética com o encerramento canônico em `renders/[Nome da Música].mp4`.
