import OBSWebSocket from "obs-websocket-js";

export default class OBSConnectionService {
  constructor(address, password) {
    this.obs = new OBSWebSocket();
    this.address = address;
    this.password = password;
  }

  async connect() {
    try {
      await this.obs.connect(this.address, this.password);
    } catch (error) {
      throw new Error(`Erro ao conectar ao OBS WebSocket: ${error}`);
    }
  }

  async startStreaming() {
    try {
      await this.connect();
      await this.obs.call("StartStream");
      console.log("A transmissão foi iniciada!");
      await this.obs.disconnect();
    } catch (error) {
      throw new Error(`Erro ao iniciar a transmissão: ${error}`);
    }
  }

  async switchScene(sceneName) {
    try {
      await this.connect();
      await this.obs.call("SetCurrentProgramScene", {
        sceneName: sceneName,
      });
      console.log("Cena alterada!");
      await this.obs.disconnect();
    } catch (error) {
      throw new Error(`Erro ao alterar a cena: ${error}`);
    }
  }

  async stopStreaming() {
    try {
      await this.connect();
      await this.obs.call("StopStream");
      console.log("A transmissão foi encerrada!");
      await this.obs.disconnect();
    } catch (error) {
      throw new Error(`Erro ao encerrar a transmissão: ${error}`);
    }
  }
}
