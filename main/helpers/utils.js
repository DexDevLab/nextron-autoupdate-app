import { app, BrowserWindow } from "electron";
import Store from "electron-store";
import _ from "lodash";
import { windowTitles } from "./windows";

// Translate page path to Window Loader depending of the application environment
export function getBackendPath(pagePath) {
  const isProd = process.env.NODE_ENV === "production";
  if (isProd) {
    return `app://./${pagePath}`;
  } else {
    const port = process.argv[2];
    return `http://localhost:${port}/${pagePath}`;
  }
}

// INTERNAL FN TO FORMAT CURRENT DATE TO A SANITIZED FORMAT
export function generateFormattedDate(date) {
  let today = null;
  if (date == null) {
    today = new Date();
  } else {
    today = new Date(date);
  }

  const YYYY = today.getFullYear();
  const MM = String(today.getMonth() + 1).padStart(2, "0");
  const DD = String(today.getDate()).padStart(2, "0");
  const hh = String(today.getHours()).padStart(2, "0");
  const mm = String(today.getMinutes()).padStart(2, "0");
  const ss = String(today.getSeconds()).padStart(2, "0");
  const formattedDate = `${YYYY}-${MM}-${DD}--${hh}:${mm}:${ss}`;

  return formattedDate;
}

// Create an instance of the Electron Store
export const instantiateElectronStore = async (init = false, options = {}) => {
  const store = new Store(options);
  if (init) {
    switch (options?.name) {
      case "log":
        store.clear();
        const timestamp = generateFormattedDate();
        store.set({
          [timestamp]: "Logger Started",
        });
        break;
      default:
        store.set({
          version: app.getVersion(),
        });
        break;
    }
  }
  return store;
};

// Stores data to Electron Store, in Object format. Uses watchers (optional) to create identifier for a specific listener for the object was set. If the object changes, it trigggers the event using a channel made with the watcher. This Function is meant to be used by the Electron backend
export const setElectronStore = async (args, options = {}) => {
  try {
    const keys = Object.keys(args);
    if (keys.length > 1) {
      throw new Error("Error: Only 1 key is allowed");
    }
    const store = await instantiateElectronStore(false, options);
    store.set(args);
    const hasKey = store.has(keys[0]);
    if (!hasKey) {
      throw new Error();
    } else {
      const data = await store.get(keys[0]);
      if (_.isEqual(args[keys[0]], data)) {
        return data;
      } else {
        throw new Error();
      }
    }
  } catch (e) {
    const error = new Error(e);
    error.message = "Error: Store cannot be writable";
    const timestamp = generateFormattedDate();
    await setElectronStore({ [timestamp]: error.message }, { name: "log" });
    const isProd = process.env.NODE_ENV === "production";
    if (isProd) {
      setTimeout(() => {
        app.exit(1);
      }, 5000);
    }
  }
};

// Send message from main to logger
export const logger = async (message) => {
  let msg = "";
  if (typeof message !== "object") {
    const timestamp = generateFormattedDate();
    msg = {
      [timestamp]: message,
    };
  } else {
    msg = message;
  }
  await setElectronStore(msg, { name: "log" });
};

// Get all current Electron windows, or get by title or name
export const getAllWindows = ({ title, name }) => {
  const browserWindowArr = BrowserWindow.getAllWindows();
  let windowList = [];
  browserWindowArr.forEach((window) => {
    windowList.push({
      id: window.id,
      title: window.getTitle(),
    });
  });
  windowList = windowList.reverse();

  title = title || windowTitles[name] || name;

  if (title) {
    windowList = windowList.filter((window) => window.title === title);
    if (windowList.length === 0) {
      return {
        id: 0,
        title: "none",
      };
    } else {
      return windowList[windowList.length - 1];
    }
  } else {
    return windowList;
  }
};
