const { app, BrowserWindow, ipcMain, session } = require('electron');
// Because of a transpil bug typescript/ES with electron-store, we keep the file no TS.
const Store = require('electron-store');
const path = require('path');
const isDev = require('electron-is-dev');
const fetch = require('node-fetch');
const { promises } = require('fs');
const url = require('url');
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
require('electron-reload');

let mainWindow;

const store = new Store({
  defaults: {
    state : {
      settingsState: {
        locale: 'en',
        apiUrl: 'https://invidio.us',
        autoplay: true,
        showRecommended: true,
        showComments: true,
        codeRegion: 'US'
      },
      themesState: {
        themes: {
          "0": {
            id: "0",
            name: "All"
          },
        },
        channels: {
          "0": []
        },
        watchlater: []
      },
    }
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
      webSecurity: !isDev
    },
  });

  if (session.defaultSession === undefined) {
    throw new Error('defaultSession is undefined');
  }

  ElectronBlocker.fromPrebuiltAdsAndTracking(fetch, {
    path: 'engine.bin',
    read: promises.readFile,
    write: promises.writeFile,
  }).then(blocker => {
    blocker.enableBlockingInSession(session.defaultSession);
  });
  
  // store.clear();

  // initialize with data
  mainWindow.webContents.on('did-finish-load', () => {
    const initialState = store.get('state');
    if(mainWindow) {
      mainWindow.webContents.send('APP_INITIAL_STATE', { 
        initialSettings: initialState.settingsState,
        initialThemes: initialState.themesState
      });
    }
  });

  const startUrl =  isDev ? 'http://localhost:3000' : url.format({
      pathname: path.join(__dirname, '/../index.html'),
      protocol: 'file:',
      slashes: true
  });

  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // events to handle storage
  ipcMain.on('APP_SAVE_SETTINGS', (event, settings) => {
    store.set('state.settingsState', settings);
  });

  ipcMain.on('APP_SAVE_THEMES', (event, themes) => {
    store.set('state.themesState', themes);
  });
}

app
  .on('ready', createWindow)
  .on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  .on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  });

