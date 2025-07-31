import { app, BrowserWindow, ipcMain } from "electron";
import { download } from "electron-dl";
import _ from "lodash";
import { prismaService } from "../services/prisma";
import { getAllWindows, instantiateElectronStore, logger } from "./utils";
import { instantiateWindow } from "./windows";

// All 'ipcMain.on / ipcMain.handle' events and functions
export const ipcEvents = () => {
  // Default message function
  ipcMain.on("message", async (event, arg) => {
    try {
      const users = app.getAppPath();
      event.reply("message", users);
    } catch (error) {
      logger(error);
      event.reply("message", error);
    }
  });

  // Mock Download function
  ipcMain.on("download", async (event, arg) => {
    const window = BrowserWindow.getFocusedWindow();
    console.log(41, "download args: ", arg);

    download(window, arg.url, {
      onProgress: (status) => {
        console.log(47, "download progress: ", status);

        //PROGRESS SENDING
        const mainWindowId = getAllWindows("DexCraft Launcher").id;
        BrowserWindow.fromId(mainWindowId).webContents.send(
          "download progress",
          status
        );
        //mainWindow.webContents.send("download progress", status);
      },
    });
  });

  // Mock insert data to db function
  ipcMain.on("cadastrar", async (event, { name, email, password }) => {
    try {
      const data = {
        name,
        email,
        password,
        nextSeasonTags: "",
      };

      // const createUser = await prisma.user.create({
      //   data,
      // });
      const createUser = await prismaService({
        table: "user",
        fn: "create",
        args: data,
      });

      event.reply("cadastrar", createUser);
    } catch (error) {
      event.reply("cadastrar", error);
    }

    {
      /* data: {
          name: 'CARALHO',
          email: 'meucu@teucu.com',
          password: 'Senh@123'
          nextSeasonTags: '',
          createdAt: '2025-04-10--13:47'
        }, */
    }
  });

  // Opens a window from Render
  ipcMain.on(
    "window-open",
    async (event, { windowName, closeParent = false }) => {
      if (closeParent) {
        event.sender.close();
      }
      const windowId = getAllWindows({ name: windowName }).id;
      if (windowId === 0) {
        instantiateWindow[windowName]();
      } else {
        BrowserWindow.fromId(windowId).show();
      }
    }
  );

  // Closes own window from Render. May close the entire app if needed
  ipcMain.on("window-close", async (event, exitApp = false) => {
    event.sender.close();
    if (exitApp) {
      app.exit(0);
    }
  });
};

ipcMain.on('update-msg', async(event, args) =>{
  console.log(102, args);
  BrowserWindow.getFocusedWindow().webContents.send('update-msg', args)
  //event.reply('update-msg', args);
})


// Gets data from Electron Store. May use specific key to get refined properties and values (recommended for performance)
// ipcMain.on("store-get", async (event, key) => {
//   const storeData = instantiateElectronStore().get(key);
//   event.reply("store-get", storeData);
// });




// Stores data to Electron Store, in Object format. Uses watchers (optional) to create identifier for a specific listener for the object was set. If the object changes, it trigggers the event using a channel made with the watcher
// ipcMain.on("store-set", async (event, { obj, watchers }) => {
//   instantiateElectronStore().set({ ...obj });
//   const storeData = instantiateElectronStore().get(Object.keys({ ...obj })[0]);
//   if (_.isArray(watchers)) {
//     watchers.forEach((id) => {
//       event.reply(`store-watch-${Object.keys({ ...obj })[0]}-${id}`, storeData);
//     });
//   } else {
//     event.reply(
//       `store-watch-${Object.keys({ ...obj })[0]}-${watchers}`,
//       storeData
//     );
//   }
// });

// Deletes a value from the Electron Store. Deletes entire store if no key is provided
// ipcMain.on("store-delete", async (event, key) => {
//   instantiateElectronStore().delete(key);
// });

// // Instantiate the Electron Store logger
// ipcMain.handle("logger-start", async (event, msg) => {
//   instantiateElectronStore(false, { name: "log" }).clear();
// });

// // Set information to the Electron Store Logger
// ipcMain.on("logger-set", async (event, msg) => {
//   instantiateElectronStore(false, { name: "log" }).set(msg);
// });


