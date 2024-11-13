// setupDatabase.js
// loadQueries.js를 임포트(import)하고, 
// SQLite 데이터베이스 연결을 설정하며 테이블을 생성합니다.
/*
쿼리 실행하기
쿼리를 불러와서 SQLite 데이터베이스에 실행합니다.
*/

const sqlite3 = require('sqlite3').verbose();
const loadQueries = require('./loadQueries');

const db = new sqlite3.Database('./database.sqlite');

const setupDatabase = async () => {
  try {
    const queries = await loadQueries();
    db.serialize(() => {
      db.exec(queries, (err) => {
        if (err) {
          console.error('Error executing queries:', err.message);
        } else {
          console.log('Database setup complete.');
        }
      });
    });
  } catch (error) {
    console.error('Error loading queries:', error.message);
  } finally {
    db.close();
  }
};

setupDatabase();
