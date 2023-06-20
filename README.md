# OBS Scheduler

O OBS Scheduler é um software que permite ao usuário agendar tarefas no software OBS Studio, como iniciar a transmissão, trocar de cena e encerrar a transmissão.

## Características

- Agendar início da transmissão
- Agendar troca de cena
- Agendar encerramento da transmissão
- Interface de linha de comando fácil de usar

## Pré-requisitos

- [Node.js](https://nodejs.org/en/download/) instalado
- [OBS Studio](https://obsproject.com/download) e [OBS WebSocket plugin](https://obsproject.com/forum/resources/obs-websocket-remote-control-of-obs-studio-made-easy.466/) instalados

## Configuração

1. Faça o clone deste repositório em sua máquina local:

```bash
git clone https://github.com/username/obs-scheduler.git
cd obs-scheduler
```

2. Instale as dependências do projeto:

```bash
npm install
```

3. Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente OBS_ADDRESS e OBS_PASSWORD:

```env
OBS_ADDRESS=localhost:4455
OBS_PASSWORD=suasenha
```

Substitua localhost:4455 pelo endereço do seu servidor OBS WebSocket e suasenha pela senha.

## Como usar

Para iniciar o software, execute o seguinte comando no diretório raiz do projeto:

```bash
node main.js
```

Siga as instruções na linha de comando para agendar suas tarefas.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir um issue ou enviar um pull request.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
