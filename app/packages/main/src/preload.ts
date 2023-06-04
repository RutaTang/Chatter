import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electron', {
    invock: (channel: string, ...args: any[]) => {
        return ipcRenderer.invoke(channel, ...args)
    }
})
