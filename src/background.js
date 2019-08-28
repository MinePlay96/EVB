'use strict'

// iport used components
// ---------------------------------------------------------------------------------------------------------------//
import { app, BrowserWindow, Menu, protocol, Tray, shell, ipcMain } from 'electron';
import path from 'path';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// ---------------------------------------------------------------------------------------------------------------//
const isDevelopment = process.env.NODE_ENV !== 'production'
let win
let tray = null;
let trayImag = path.join(__static, 'favicon.ico')

const clientProtocol = {}
clientProtocol.list = {};
// register global functions
// ---------------------------------------------------------------------------------------------------------------//

clientProtocol.on = function (event, callback) {
  this.list[event] = callback
}

clientProtocol.call = function (event, data) {
  console.log(this.list, event, data);
  this.list[event](data)
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    icon: trayImag,
    show: false, 
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  win.once('ready-to-show', () => {
    win.show()
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  })
}

function createTray() {
  // create tray menue template
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'close',
      click: function () {
        app.quit();
      }
    }
  ]);

  // create tray with image tooltip and menue
  tray = new Tray(trayImag);
  tray.setToolTip(app.getName());
  tray.setContextMenu(contextMenu);

  // add click event to tray
  tray.on('click', () => {
    if (win === null) {
      createWindow();
    } else {
      win.show();
    }
  });
}

function protocolLogic(argv = process.argv) {
  let matches = argv[argv.length-1].match(/(\w+)(?::\/\/)(.+)/)
  if (!matches) {
    return
  }
  let calledProtocol = {protocol: matches[1], url: matches[2]}
  clientProtocol.call(calledProtocol.protocol, calledProtocol.url)
}

// make app logic
// ---------------------------------------------------------------------------------------------------------------//

// get if this is the first instance
const firstInstance = app.requestSingleInstanceLock()

if (!firstInstance) {
  // if this instent is the first instance close app imediatly
  app.quit()
} else {
  // if this is the first instance 

  // register nessessary things
  // Scheme must be registered before the app is ready
  protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

  // register app events 
  // if it recives data from a second instance 
  app.on('second-instance', function (event, commandLine, workingDirectory) {
    if (win === null) {
      createWindow();
    } else {
      win.show();
    }
    protocolLogic(commandLine)
  })

  // define what to do if the app can start
  app.on('ready', async () => {
    createTray()
    createWindow()
    protocolLogic()
  })


  // Quit when all windows are closed.
  app.on('window-all-closed', (event) => {
    // keeps Application allive after every window has closed
    event.preventDefault()
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
}

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// Test zone
// ---------------------------------------------------------------------------------------------------------------//

