"use strict";

const database = require('better-sqlite3');
const db = new database('log.db')

const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='
    table ' and name='
    accesslog ';`);

let row = stmt.get();
if (row == undefined) {
    console.log('The database appears to be  empty. I will create it now.');
    const sqlInit = `
    CREATE TABLE accesslog(
        id INTEGER PRIMARY KEY,
        remoteaddr VARCHAR,
        remoteuser VARCHAR,
        time NUMBER,
        method VARCHAR,
        url VARCHAR,
        protocol VARCHAR,
        httpversion VARCHAR,
        status INTEGER,
        referrer VARCHAR,
        useragent VARCHAR
    ); `
    db.exec(sqlInit);
    console.log("Database created");
} else {
    console.log('Database here')
}
module.exports(db)