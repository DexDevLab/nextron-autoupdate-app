import { app } from "electron";
import path from "path";
import { createWindow } from "./createWindow";
import { getBackendPath } from "./utils";

const isProd = process.env.NODE_ENV === "production";

// List all window titles for better reference
export const windowTitles = {
  splash: "Splash Screen",
  login: "Entre no DexCraft Launcher",
  main: "DexCraft Launcher",
};

// Set and instantiate all application windows
export const instantiateWindow = {
  splash: async () => {
    // Setting window
    const window = createWindow("splash", {
      title: windowTitles.splash,
      width: 300,
      height: 300,
      minHeight: 300,
      minWidth: 300,
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        webSecurity: false,
      },
      alwaysOnTop: true,
      focusable: true,
      frame: false,
      skipTaskbar: true,
      movable: true,
      resizable: false,
      maximizable: false,
      minimizable: false,
    });
    // Loading Page component
    await window.loadURL(getBackendPath("splash"));

    window.webContents.openDevTools();
    if (!isProd) {
      // Open Dev Tools
      //window.webContents.openDevTools();
    }
    // Specific commands when closing window
    window.on("close", () => {
      app.exit(0);
    });
    // Using 'center' before 'show' is needed to center the window properly on the screen
    window.center();
    window.show();
    return window;
  },
  login: async () => {
    const window = createWindow("login", {
      title: windowTitles.login,
      width: 1920,
      height: 1080,
      minHeight: 768,
      minWidth: 1366,
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        webSecurity: false,
      },
    });
    if (!isProd) {
      window.webContents.openDevTools();
    }
    window.setBackgroundColor("#1A202C");
    await window.loadURL(getBackendPath("login"));
    window.center();
    window.maximize();
    window.on("close", () => {
      app.exit(0);
    });
    return window;
  },
  main: async () => {
    const window = createWindow("main", {
      title: windowTitles.main,
      width: 1920,
      height: 1080,
      minHeight: 768,
      minWidth: 1366,
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        webSecurity: false,
      },
    });
    if (!isProd) {
      window.webContents.openDevTools();
    }
    window.setBackgroundColor("#1A202C");
    await window.loadURL(getBackendPath("main"));
    window.center();
    window.maximize();
    window.on("close", () => {
      app.exit(0);
    });
    return window;
  },
};
