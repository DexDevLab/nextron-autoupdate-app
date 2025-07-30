// Alias for IPC Communications, in order to a clean and intuitive function. Example: from 'window.ipc.send' to 'IPC.SEND'
export const IPC = {
  LOG: async (message) => {
    return await window.ipc.log(message);
  },
  CALL: (channel, value) => {
    return window.ipc.send(channel, value);
  },
  ASYNC: async (channel, value) => {
    return await window.ipc.invoke(channel, value);
  },
  LISTEN: (channel, callback) => {
    return window.ipc.on(channel, callback);
  },
  WATCH: (channel, callback) => {
    return window.ipc.watch(channel, callback);
  },
  UNSUBSCRIBE: (channel) => {
    return window.ipc.unsubscribe(channel);
  },
};
