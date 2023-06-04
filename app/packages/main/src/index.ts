import { app, BrowserWindow } from 'electron'
import path from 'path'
import "./store"
import { serviceEngine } from './service'
import "./logger"

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 750,
        minWidth: 850,
        minHeight: 600,
        titleBarStyle: 'hiddenInset',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadURL('http://localhost:5173')
}

app.whenReady().then(() => {

    // init IpcMain services
    serviceEngine.start()

    // init window
    createWindow()
})

app.on('window-all-closed', () => {
    app.quit()
})
