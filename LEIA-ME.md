# Transcrever.

App de transcrição de áudio que roda **100% no seu computador** — nada é enviado pra internet, sem mensalidade, sem chave de API.

## Programa para Windows (recomendado)

1. Dê dois cliques em **`dist\Transcrever-Instalador-1.0.0.exe`** — instala em segundos e cria o atalho **Transcrever** na área de trabalho e no menu Iniciar.
2. Abra o Transcrever, arraste um áudio (MP3, WAV, OGG, M4A, áudio de WhatsApp, até vídeo MP4) ou grave pelo microfone.
3. Na primeira transcrição, o app baixa o modelo de voz escolhido (uma vez só — depois funciona offline).
4. Pronto: copie o texto, baixe `.txt` ou `.srt` (legenda com tempos).

Para desinstalar: Configurações do Windows → Aplicativos → Transcrever.

## Versão no navegador (alternativa)

Dois cliques em `Transcrever.bat` — abre o mesmo app no navegador em http://localhost:8737 (deixe a janela preta aberta enquanto usa).

## Dicas

- **Modelo**: "Equilibrado" é um bom começo. Para português com melhor qualidade, use **"Preciso"** (download de ~300 MB, uma vez só). "Máximo" é o melhor de todos, mas pesado (~1,6 GB).
- Com placa de vídeo compatível, o app usa **WebGPU** (bem mais rápido). Senão, cai automaticamente para o processador.
- Logo após baixar o modelo, o app pode "pensar" por alguns segundos preparando a placa de vídeo — normal.
- O texto final é editável antes de copiar/baixar.
- Áudios longos funcionam — processa em blocos de 30 segundos mostrando o progresso e o texto ao vivo.

## Para desenvolvedores

- `index.html` — o app inteiro (interface + lógica); mesmo arquivo usado pela versão web e pela de desktop.
- `main.js` + `package.json` — casca Electron; `npm run start` roda em modo dev, `npm run dist` gera o instalador em `dist/`.
- `vendor/` — transformers.js, runtime ONNX (WASM) e fontes embutidos, para funcionar sem CDN.
- Motor: [Whisper](https://openai.com/research/whisper) (OpenAI) via [transformers.js](https://huggingface.co/docs/transformers.js) (Hugging Face).
