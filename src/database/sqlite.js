const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "./main.db"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
		console.error(err.message)
		throw err
    }else{
        console.log('Connected to the SQLite database.')
    }
});

// первичное добавление таблиц

const createTableSqlSettings = ` 
    CREATE TABLE IF NOT EXISTS settings ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        socket_url TEXT NOT NULL
    );
    `; 
const createTableSqlUser = ` 
    CREATE TABLE IF NOT EXISTS user ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL,
        peer_id TEXT NOT NULL,
        user_uniq_id TEXT NOT NULL
    );
    `; 

const createTableSqlWindow = ` 
    CREATE TABLE IF NOT EXISTS appwindow ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        x INTEGER NOT NULL,
        y INTEGER NOT NULL,
        width INTEGER NOT NULL,
        height INTEGER NOT NULL
    );
    `; 

const inputDataToSettings = `
INSERT OR IGNORE INTO settings(id, socket_url) VALUES(1, 'localhost');
`
const inputDataToUser = `
INSERT OR IGNORE INTO user(id, name, user_uniq_id, peer_id) VALUES(1, '', '', '');
`
const inputDataToWindow = `
INSERT OR IGNORE INTO appwindow(id, x, y, width, height) VALUES(1, 0, 0, 700, 500);
`
export async function createTableSettings () {
    return new Promise((resolve, reject) => {
        db.run(createTableSqlSettings, (err) => {
            if (err) {
                reject(err)
                console.error('settings table create error:', err.message);
            } else {
                resolve()
                console.log('settings table create successfull')
            }
        })
    })
}
export async function createTableUser () {
    return new Promise((resolve, reject) => {
        db.run(createTableSqlUser, (err) => {
            if (err) {
                reject(err)
                console.error('User table create error:', err.message);
            } else {
                resolve()
                console.log('User table create successfull')
            }
        })
    })
}
export async function createTableWindow () {
    return new Promise((resolve, reject) => {
        db.run(createTableSqlWindow, (err) => {
            if (err) {
                reject(err)
                console.error('Window table create error:', err.message);
            } else {
                resolve()
                console.log('Window table create successfull')
            }
        })
    })
}
export async function createTableAddSettings () {
    return new Promise((resolve, reject) => {
        db.run(inputDataToSettings, (err) => {
            if (err) {
                reject(err)
                console.error('inputData settings create error:', err.message);
            } else {
                resolve()
                console.log('inputData settings create successfull')
            }
        })
    })
}
export async function createTableAddUser () {
    return new Promise((resolve, reject) => {
        db.run(inputDataToUser, (err) => {
            if (err) {
                reject(err)
                console.error('inputData user create error:', err.message);
            } else {
                resolve()
                console.log('inputData user create successfull')
            }
        })
    })
}
export async function createTableAddWindow () {
    return new Promise((resolve, reject) => {
        db.run(inputDataToWindow, (err) => {
            if (err) {
                reject(err)
                console.error('inputData window create error:', err.message);
            } else {
                resolve()
                console.log('inputData window create successfull')
            }
        })
    })
}

// первичное добавление таблиц

export async function getUser () {
    const sql = `select * from user WHERE id=1`
	var params = []
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                const obj = {
                    "message":"success",
                    "data":rows
                }
                resolve(obj)
            }
        })
    })
}
export async function getSettings () {
    const sql = `select * from settings WHERE id=1`
	var params = []
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                const obj = {
                    "message":"success",
                    "data":rows
                }
                resolve(obj)
            }
        })
    })
}
export async function setSettings (str) {
    const data = JSON.parse(str)
    console.log({data});
    const frequency = +data.frequency
    const sql = `UPDATE settings SET socket_url='${data.socket_url}', acc_color='${data.acc_color}', mag_color='${data.mag_color}', gyro_color='${data.gyro_color}', bar_color='${data.bar_color}', frequency='${frequency}' WHERE id=1`
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                const obj = {
                    "message":"success"
                }
                resolve(obj)
            }
        })
    })
}
export async function getWindow () {
    const sql = `select * from appwindow WHERE id=1`
	var params = []
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}
export async function setWindow (data, is_position) {
    let sql = `UPDATE appwindow SET width=${data.width}, height=${data.height} WHERE id=1`
    if (is_position) {
        sql = `UPDATE appwindow SET x=${data.x}, y=${data.y} WHERE id=1`
    }
	var params = []
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve('change window')
            }
        })
    })
}

export async function setUser (data) {
    const date = new Date()
    const stamp = date.getTime()
    let sql = `UPDATE user SET name='${data.name}', user_uniq_id=${stamp}, peer_id='${data.peer_id}' WHERE id=1`
	var params = []
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve({ name: data.name, id: stamp })
            }
        })
    })
}
export async function updateUser (data) {
    let sql = `UPDATE user SET peer_id='${data.peer_id}', name='${data.name}' WHERE id=1`
	var params = []
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve({ name: data.name })
            }
        })
    })
}
