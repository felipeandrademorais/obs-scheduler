import dotenv from "dotenv";
import OBSConnectionService from "./services/OBSConnection.js";
import ScheduleTaskService from "./services/ScheduleTask.js";

dotenv.config();

const obsConnectionService = new OBSConnectionService(
  process.env.OBS_ADDRESS,
  process.env.OBS_PASSWORD
);

async function mainMenu() {
  console.log("Escolha uma opção para agendar:");
  console.log("1. Iniciar transmissão");
  console.log("2. Trocar de cena");
  console.log("3. Encerrar transmissão");

  process.stdin.once("data", (optionData) => {
    const option = optionData.toString().trim();

    console.log("Digite a hora para executar a ação (formato: HH:MM):");
    process.stdin.once("data", (timeData) => {
      const time = timeData.toString().trim();
      const currentDate = new Date();
      const [hours, minutes] = time.split(":");
      const scheduleDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        hours,
        minutes
      );

      if (scheduleDate.toString() === "Invalid Date") {
        console.log("Formato de hora inválido. Tente novamente.");
        mainMenu(); // Return to main menu
        return;
      }

      switch (option) {
        case "1":
          console.log(`Início da transmissão agendado para: ${scheduleDate}`);
          new ScheduleTaskService(
            scheduleDate,
            obsConnectionService.startStreaming.bind(obsConnectionService)
          );
          mainMenu(); // Return to main menu
          break;
        case "2":
          console.log("Digite o nome da cena que deseja trocar:");
          process.stdin.once("data", (sceneData) => {
            const sceneName = sceneData.toString().trim();
            console.log(`Troca de cena agendada para: ${scheduleDate}`);
            new ScheduleTaskService(scheduleDate, () =>
              obsConnectionService.switchScene(sceneName)
            );
            mainMenu(); // Return to main menu after scene name is input
          });
          break;
        case "3":
          console.log(
            `Encerramento da transmissão agendado para: ${scheduleDate}`
          );
          new ScheduleTaskService(
            scheduleDate,
            obsConnectionService.stopStreaming.bind(obsConnectionService)
          );
          mainMenu(); // Return to main menu
          break;
        default:
          console.log("Opção inválida. Tente novamente.");
          mainMenu(); // Return to main menu
      }
    });
  });
}

mainMenu();
