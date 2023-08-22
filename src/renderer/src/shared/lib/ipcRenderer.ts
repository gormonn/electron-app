const browserWarning = () => console.error("ipcRenderer cannot be called in Browser");

export const ipcRenderer =
  window?.electron?.ipcRenderer ||
  ({
    invoke: browserWarning,
    on: browserWarning,
    once: browserWarning,
    postMessage: browserWarning,
    removeAllListeners: browserWarning,
    removeListener: browserWarning,
    send: browserWarning,
    sendSync: browserWarning,
    sendTo: browserWarning,
    sendToHost: browserWarning,
    removeEventListener: browserWarning,
  } as Electron.IpcRenderer);
