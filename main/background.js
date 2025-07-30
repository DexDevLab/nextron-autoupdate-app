import "dotenv/config";
import { app } from "electron";
import serve from "electron-serve";
import { appEvents } from "./helpers/appEvents";
import { ipcEvents } from "./helpers/ipcEvents";
import { ipcHandlers } from "./helpers/ipcHandlers";
import { instantiateElectronStore, logger } from "./helpers/utils";
import { instantiateWindow } from "./helpers/windows";

const isProd = process.env.NODE_ENV === "production";

console.log(`\n\nApplication Started\n\n`);

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

console.log(`\n\nStarting Background\n\n`);

(async () => {
  // Trigger 'Ready' Event
  await app.whenReady();
  console.log(`\n\nReady Events Triggered\n\n`);

  // Instantiate and show Splash Window
  await instantiateWindow.splash();
  console.log(`\n\nSplash Screen Instantiated\n\n`);

  // Instantiate Electron Store
  await instantiateElectronStore(true);
  console.log(`\n\nElectron Store Instantiated\n\n`);

  // Instantiate Logger
  await instantiateElectronStore(true, { name: "log" });
  console.log(`\n\nLogger Store Instantiated\n\n`);

  // Registering Events and Functions
  appEvents();
  await logger(`App Events Registered`);
  ipcEvents();
  await logger(`IPC Events and Functions Registered`);
  ipcHandlers();
  await logger(`IPC API Handlers Registered`);
})();
