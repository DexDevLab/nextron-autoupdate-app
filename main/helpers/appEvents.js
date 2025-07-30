import { app } from "electron";
import { logger } from "./utils";

// All 'app.on' events
export const appEvents = () => {
  const isProd = process.env.NODE_ENV === "production";

  // Close all windows
  app.on("window-all-closed", () => {
    logger(`Application Closed`);
    app.quit();
  });

  // Keyboard commands registering
  app.on("browser-window-focus", function () {
    if (isProd) {
      globalShortcut.register("CommandOrControl+R", () => {
        logger("CommandOrControl+R is pressed: Shortcut Disabled");
      });
      globalShortcut.register("F5", () => {
        logger("F5 is pressed: Shortcut Disabled");
      });
      globalShortcut.register("CommandOrControl+Shift+R", () => {
        logger("CommandOrControl+Shift+R is pressed: Shortcut Disabled");
      });
    }
  });

  // Disabling keyboard commands on production
  app.on("ready", () => {
    if (isProd) {
      logger(`Removing Keyboard Commands...`);
      globalShortcut.unregister("CommandOrControl+R");
      globalShortcut.unregister("F5");
      globalShortcut.unregister("CommandOrControl+Shift+R");
    }
  });
};
