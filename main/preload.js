import { contextBridge, ipcRenderer } from "electron";

// Exposes IPC API commands to Renderer using an alias
const handler = {
  // Send message TO logger
  log(message) {
    return ipcRenderer.invoke("logger", message);
  },
  // Send data TO Main
  send(channel, value) {
    ipcRenderer.send(channel, value);
  },
  // Send data TO Main async
  invoke(channel, value) {
    return ipcRenderer.invoke(channel, value);
  },
  // Creates a listener to a specific channel. After receiving the reply, the listener is removed gracefully
  on(channel, callback) {
    const subscription = (_event, ...args) => callback(...args);
    ipcRenderer.on(channel, subscription);
    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
  // Watch a specific channel, returning all the replies
  watch(channel, callback) {
    const subscription = (_event, ...args) => callback(...args);
    ipcRenderer.on(channel, subscription);
  },
  // Unsubscribe watched channel
  unsubscribe(channel) {
    ipcRenderer.removeAllListeners(channel);
  },
};

contextBridge.exposeInMainWorld("ipc", handler);
