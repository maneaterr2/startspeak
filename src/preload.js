// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron/renderer')
contextBridge.exposeInMainWorld('electronAPI', {
	getUser: () => ipcRenderer.invoke('dialog:getUser'),
	setUser: (data) => ipcRenderer.invoke('dialog:setUser', data),
	updateUser: (data) => ipcRenderer.invoke('dialog:updateUser', data),
	updateUserPeer: (data) => ipcRenderer.invoke('dialog:updateUserPeer', data),
	getSettings: () => ipcRenderer.invoke('dialog:getSettings'),
	setSettings: (data) => ipcRenderer.invoke('dialog:setSettings', data),
	onMainSend: (callback) => ipcRenderer.on('main-send', (_event, value) => callback(value)),
	onTalkToSpeak: (callback) => ipcRenderer.on('talk-to-speak', (_event, value) => callback(value)),
})
contextBridge.exposeInMainWorld('envVars', {
	myEnvironmentVariable: process.env.NODE_ENV
});
