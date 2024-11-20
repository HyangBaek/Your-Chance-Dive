const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  // items 테이블 생성
  db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    description TEXT,
    image TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )`);

  // users 테이블 생성
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    email TEXT UNIQUE,
    createdAt TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )`);

  // 예제 데이터를 삽입합니다.
  const currentDate = new Date().toISOString();
//   db.run("INSERT INTO items (name, price, description, image, createdAt) VALUES (?, ?, ?, ?, ?)", ['Item 1', 1000, 'Description of Item 1', '/uploads/no_image.png', currentDate]);
//   db.run("INSERT INTO items (name, price, description, image, createdAt) VALUES (?, ?, ?, ?, ?)", ['Item 2', 2000, 'Description of Item 2', '/uploads/no_image.png', currentDate]);
//   db.run("INSERT INTO users (username, password, email, createdAt) VALUES (?, ?, ?, ?)", ['user1', 'password1', 'user1@example.com', currentDate]);
//   db.run("INSERT INTO users (username, password, email, createdAt) VALUES (?, ?, ?, ?)", ['user2', 'password2', 'user2@example.com', currentDate]);
});

db.close();
