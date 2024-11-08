import * as db from './database/sqlite'

let globalWindow = null

export function setGlobalWindow (data) {
    globalWindow = data
}

// export function sendMessageToClient (channel, message) {
// 	if (globalWindow) {
// 		globalWindow.webContents.send('main-send', { channel: channel, value: message })
// 	} else {
// 		console.log('[main function log]: global window unset');
// 	}
// }

export function test () {
    return { name: 'test from app import' }
}

export function timeNow () {
    const date = new Date()
	const new_date = {}
	new_date.hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
	new_date.minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	new_date.second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
	return `${new_date.hour}:${new_date.minute}:${new_date.second}`;
}

export async function setSettings (event, data) {
	try {
		const response = await db.setSettings(data)
		return response
	} catch (error) {
		throw error
	}
}
export async function setUser (event, data) {
	try {
		const response = await db.setUser(data)
		return response
	} catch (error) {
		throw error
	}
}
export async function updateUser (event, data) {
	try {
		const response = await db.updateUser(data)
		return response
	} catch (error) {
		throw error
	}
}
