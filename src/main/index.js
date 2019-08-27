import { app, BrowserWindow, ipcMain, dialog } from 'electron'

import fs from 'fs'
import path from 'path'

import settingsFile from './settingsFile'

const user = require('os').userInfo().username

const { spawn, exec } = require('child_process')

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
    height: 768,
    useContentSize: true,
    width: 1024,
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

function makeDir (newDir) {
  if (!newDir) return console.log('newDir must be specified')
  return new Promise ((resolve, reject) => {
    fs.mkdir(newDir, err => {
      if (err) return reject(err)
      return resolve(`${newDir} successfully created`)
    })
  })
}

ipcMain.on('openFileBrowser', e => {
  const reply = data => e.sender.send('fileLocation', data)

  dialog.showOpenDialog(mainWindow, {properties: ['openDirectory']}, data => {
    const newLocation = path.join(data[0], 'dna_projects_new')
    settingsFile.read().then(settings => {
      let update = settings.settings
      update.project_location = newLocation
      settingsFile.write({ settings: update }).then(() => {
        makeDir(newLocation)
          .then(data => {
            e.sender.send('sendSettings', { e, update})
          })
          .catch(err => {
            console.log('Error while crating new dir:', err)
          })
        })
          
      })


    // fs.mkdir(newLocation, (err, response) => {
    //   if (err) {
    //     console.log(err)
    //     reply(err)
    //     return
    //   }
    //   reply({ response, newLocation })
    // })
  })
})

ipcMain.on('loaded', e => {
  e.sender.send('home', __dirname)
})


ipcMain.on('readSettings', e => {
  console.log('reading settings', e)
  // const { send } = e.sender

  settingsFile.read().then(readResponse => {
    console.log('user settings found', readResponse)
    e.sender.send('userSettings', readResponse)
  })
  .catch(err => {
    console.log('error reading settings', err)
    // send('settingsNotFound', { err, message: 'Settings not found'})
    settingsFile.write().then(writeResponse => {
      console.log('Settings created', writeResponse)
      settingsFile.read().then(newFileResponse => {
        e.sender.send('userSettings', newFileResponse)
      })
      .catch(console.log)
    })
    .catch(console.log)
  })
})


// Project builder
ipcMain.on('chooseProjectLocation', e => {
  const reply = data => e.sender.send('chosenLocation', data)
  
  dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] }, data => {
    console.log('browser request', data)
    reply(data[0])
  })
})

ipcMain.on('installDependancies', (e, args) => {
  const { location } = args
  const options = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    cwd: location,
    env: null
  }

  const child = exec(`npm i`, options)
  child.stdout.on('data', response => {
    console.log('install response', { response })
    e.sender.send('processMessage', response)
  })
  child.stderr.on('data', response => {
    console.log('install error', { response })
    e.sender.send('processError', response)
  })
})

ipcMain.on('startDev', (e, args) => {
  const { location } = args
  console.log('Start dev request', location)
  const reply = data => e.sender.send('devMessage', data)

  const options = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    cwd: location,
    env: null
  }

  // exec(`cd ${location} && npm start`, (err, stdout) => {
  //   if (err) {
  //     console.log('Error running exec:', err)
  //     e.sender.send('processError', err)
  //     return
  //   }
  //   console.log('npm run start message: ', stdout)
  //   e.sender.send('processMessage', stdout)
  // })

  const child = exec('npm run dev', options)
  child.stdout.on('data', response => {
    // console.log('npm run start message', response)
    e.sender.send('processMessage', response)
  })
  child.stderr.on('data', response => {
    console.log('npm run start error', response.toString())
    e.sender.send('processError', response)
  })
})


ipcMain.on('buildProd', (e, args) => {
  const { location } = args
  console.log('Start dev request', location)
  const reply = data => e.sender.send('devMessage', data)

  const options = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    cwd: location,
    env: null
  }

  // exec(`cd ${location} && npm start`, (err, stdout) => {
  //   if (err) {
  //     console.log('Error running exec:', err)
  //     e.sender.send('processError', err)
  //     return
  //   }
  //   console.log('npm run start message: ', stdout)
  //   e.sender.send('processMessage', stdout)
  // })

  const child = exec('npm run prod', options)
  child.stdout.on('data', response => {
    // console.log('npm run start message', response)
    e.sender.send('processMessage', response)
  })
  child.stderr.on('data', response => {
    console.log('npm run start error', response.toString())
    e.sender.send('processError', response)
  })
})

