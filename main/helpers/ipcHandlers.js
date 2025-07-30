import { ipcMain } from "electron";
import _ from "lodash";
import { launcher, store, test } from "../controllers";
import { logger } from "./utils";

// All IPC Controllers to external APIs
export const ipcHandlers = () => {
  // Prisma (database) Test (Test controller) GET (Method)
  ipcMain.handle("prisma-test-get", async (event, { fn, user }) => {
    const data = await test.GET({ user: user });
    return data;
  });
};

// Prisma (database) Launcher (Launcher controller) GET (Method)
ipcMain.handle("prisma-launcher-get", async (event, { fn, args }) => {
  const data = await launcher.GET({ fn: fn, args: args });
  return data;
});

ipcMain.handle("logger", async (event, args) => {
  await logger(args);
});

// Store (Electron Store) GET (Method). May use specific key to get refined properties and values (recommended for performance)
ipcMain.handle("store-get", async (event, args) => {
  const data = await store.GET(args);
  return data;
});

// Store (Electron Store) POST (Method). Uses watchers (optional) to create identifier for a specific listener for the object was set. If the object changes, it trigggers the event using a channel made with the watcher
ipcMain.on("store-post", async (event, { key, value, watchers }) => {
  const data = await store.POST({ [key]: value });
  if (watchers) {
    if (_.isArray(watchers)) {
      watchers.forEach((id) => {
        event.reply(`store-watch-${key}-${id}`, data);
      });
    } else {
      event.reply(`store-watch-${key}-${watchers}`, data);
    }
  }
});

// Store (Electron Store) DELETE (Method). Deletes a value from the Electron Store. Deletes entire store if no key is provided
ipcMain.handle("store-delete", async (event, args) => {
  const data = await store.DELETE(args);
  return data;
});
