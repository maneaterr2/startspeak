const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const { updateElectronApp, UpdateSourceType } = require('update-electron-app')
const path = require('path');
import * as handlers from './functions'
import * as db from './database/sqlite'

if (require('electron-squirrel-startup')) {
  	app.quit();
}

let globalWindow = null

updateElectronApp({
  updateSource: {
    type: UpdateSourceType.StaticStorage,
    baseUrl: `http://213.171.3.87/win32/x64/RELEASES/`
  }
})

const createWindow = async () => {
	const mainWindow = new BrowserWindow({
		width: 700,
		height: 480,
		minWidth: 700,
		minHeight: 480,
		icon: './logo.png',
		title: process.env.NODE_ENV === "DEV" ? "Start Speak [DEV]" : "Start Speak",
		// alwaysOnTop: true,
		autoHideMenuBar: MAIN_WINDOW_VITE_DEV_SERVER_URL?false:true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		}
	});

	async function createTables () {
		// create sqlite tables
		await db.createTableWindow()
		await db.createTableSettings()
		await db.createTableUser()
		await db.createTableAddSettings()
		await db.createTableAddUser()
		await db.createTableAddWindow()
		// create sqlite tables
	}
	await createTables()

	setWindow(mainWindow)

  	// and load the index.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
		// Open the DevTools.
		mainWindow.webContents.openDevTools();
	} else {
		mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
		// mainWindow.loadURL(path.join(__dirname, 'index.html'));
	}

	mainWindow.on('moved', ()=>{
		saveWindowPosition(mainWindow.getPosition())
	})
	mainWindow.on('resized', ()=>{
		saveWindowSize(mainWindow.getSize())
	})

	const ret = globalShortcut.register('CommandOrControl+X', () => {
		console.log('CommandOrControl+X is pressed')
		mainWindow.webContents.send('talk-to-speak', { channel: 'time', value: handlers.timeNow() })
	  })
	
	  if (!ret) {
		console.log('registration failed')
	  }
	
	  // Check whether a shortcut is registered.
	  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
};

async function setWindow (mainWindow) {
	
	globalWindow = mainWindow
	handlers.setGlobalWindow(mainWindow)
	const window = await db.getWindow()
	mainWindow.setPosition(window.x, window.y)
	mainWindow.setContentSize(window.width, window.height)
	startPingPong()
}

function startPingPong () {
	setInterval(() => {
		// console.log('send to render');
		globalWindow.webContents.send('main-send', { channel: 'time', value: handlers.timeNow() })
	}, 1000);
}
async function saveWindowPosition (arr) {
	const obj = { x: arr[0], y: arr[1]}
	const result = await db.setWindow(obj, true)
	console.log(result);
}

async function saveWindowSize (arr) {
	const obj = { width: arr[0], height: arr[1]}
	const result = await db.setWindow(obj, false)
	console.log(result);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

ipcMain.handle('dialog:getUser', db.getUser)
ipcMain.handle('dialog:setUser', handlers.setUser)
ipcMain.handle('dialog:updateUser', handlers.updateUser)
ipcMain.handle('dialog:getSettings', db.getSettings)
ipcMain.handle('dialog:setSettings', handlers.setSettings)

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

