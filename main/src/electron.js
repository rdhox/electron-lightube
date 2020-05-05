const { app, BrowserWindow, ipcMain } = require('electron');
// Because of a bug typescript/ES transpil with electron-store, we keep the file no TS.
const Store = require('electron-store');
const path = require('path');
const isDev = require('electron-is-dev');
require('electron-reload');

let mainWindow;

const store = new Store({
  defaults: {
    state : {
      settingsState: {
        locale: 'en',
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

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

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

