import "dotenv/config";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import path from "path";
import { appEvents } from "./helpers/appEvents";
import { electronBuilderBootstrap } from "./helpers/electronBuilderBootstrap";
import { ipcEvents } from "./helpers/ipcEvents";
import { ipcHandlers } from "./helpers/ipcHandlers";
import { instantiateElectronStore, logger } from "./helpers/utils";
import { instantiateWindow } from "./helpers/windows";

const isProd = process.env.NODE_ENV === "production";
const { autoUpdater, AppUpdater } = require("electron-updater");

console.log(`\n\nApplication Started\n\n`);

if (isProd) {
  serve({ directory: "app" });
  autoUpdater.updateConfigPath = process.resourcesPath;
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
  autoUpdater.updateConfigPath = path.join(
    __dirname,
    "../resources/app-update.yml"
  );
}

console.log(`\n\nStarting Background\n\n`);

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;
autoUpdater.forceDevUpdateConfig = true;
autoUpdater.channel = "latest";
autoUpdater.setFeedUrl = "https://github.com/DexDevLab/nextron-autoupdate-app";

console.log(`\n\nBootstrapping Electron Builder Config\n\n`);

electronBuilderBootstrap();

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

  // Global exception handler
  process.on("uncaughtException", (error) => {
    console.log(error);
    logger(error);
  });

  ipcEvents();
  await logger(`IPC Events and Functions Registered`);

  ipcHandlers();
  await logger(`IPC API Handlers Registered`);

  autoUpdater.checkForUpdates();
  ipcMain.emit("update-msg", null, {
    status: 102,
    data: "Checking for updates...",
  });

  autoUpdater.on("update-available", (info) => {
    ipcMain.emit("update-msg", null, { status: 200, data: "Update available" });
    let pth = autoUpdater.downloadUpdate();
    ipcMain.emit("update-msg", null, { status: 200, data: pth });
  });

  autoUpdater.on("update-not-available", (info) => {
    ipcMain.emit("update-msg", null, {
      status: 200,
      data: "No update available",
    });
    ipcMain.emit("update-msg", null, { status: 200, data: pth });
  });

  autoUpdater.on("update-downloaded", (info) => {
    ipcMain.emit("update-msg", null, {
      status: 200,
      data: "Update downloaded",
    });
  });

  autoUpdater.on("error", (info) => {
    ipcMain.emit("update-msg", null, { status: 500, data: info });
  });
})();
