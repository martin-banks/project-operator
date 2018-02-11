import { app, BrowserWindow, ipcMain, dialog } from 'electron'

import fs from 'fs'
import path from 'path'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    titleBarStyle: 'hiddenInset',
    resizable: true,
    darkTheme: true,
    hasShadow: true,
    opacity: 1,
    webPreferences: {
      experimentalFeatures: true
    }
  })
  mainWindow.closeDevTools()
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */


 ipcMain.on('openFileBrowser', e => {
   const reply = data => e.sender.send('fileLocation', data)
  //  console.log({ data })
   dialog.showOpenDialog(mainWindow, {properties: ['openDirectory']}, data => {
     const newLocation = path.join(data[0], 'dna_projects_new')
     fs.mkdir(newLocation, (err, response) => {
       if (err) {
         console.log(err)
         reply(err)
         return
       }
       reply({ response, newLocation })
     })
   })
 })
