import fs from 'fs'
import path from 'path'
import { app } from 'electron'

const file = `${app.getPath('userData')}/operator.settings.json`

function write ({ settings = {} } = {}) {
  console.log('writtings settings file')
  return new Promise ((resolve, reject) => {
    if (!settings) return reject('No settings were specified')
    // if (!location) return reject('A locations.settings was not specified')

    const content = JSON.stringify({
      settings
    }, 'utf-8', 2)

    fs.writeFile(file, content, (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

function read () {
  return new Promise ((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) return reject(err)
      console.log('read content:', JSON.parse(data))
      return resolve(JSON.parse(data))
    })
  })
}

export default {
  write, 
  read,
}
