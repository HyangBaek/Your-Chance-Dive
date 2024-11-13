const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    // 'image' 열이 존재하는지 확인합니다.
    db.all("PRAGMA table_info(items);", (err, rows) => {
        if (err) {
        console.error('Error fetching table info:', err.message);
        return;
        }

        // 'image' 열이 없으면 열을 추가합니다.
        if (!rows.some(column => column.name === 'image')) {
        db.run("ALTER TABLE items ADD COLUMN image TEXT", (err) => {
            if (err) {
            console.error('Error adding column:', err.message);
            } else {
            // 기존 데이터의 'image' 열을 빈 값으로 초기화합니다.
            db.run("UPDATE items SET image = '' WHERE image IS NULL", (err) => {
                if (err) {
                console.error('Error updating items:', err.message);
                }
            });
            }
        });
        }

    });

  // `items` 테이블의 스키마를 확인하여 `sellerId` 열이 존재하는지 확인합니다.
  db.all("PRAGMA table_info(items);", [], (err, rows) => {
    if (err) {
      console.error('Error fetching table info:', err.message);
      return;
    }

    // `sellerId` 열이 존재하는지 확인합니다.
    const sellerIdExists = rows.some(row => row.name === 'sellerId');

    if (!sellerIdExists) {
      // `sellerId` 열이 존재하지 않는 경우에만 열을 추가합니다.
      db.run("ALTER TABLE items ADD COLUMN sellerId INTEGER", (err) => {
        if (err) {
          console.error('Error adding column sellerId:', err.message);
          return;
        }
        console.log('Column sellerId added successfully.');
      });
    } else {
      console.log('Column sellerId already exists.');
    }
  });

  // 판매 상황을 관리하는 새로운 테이블을 생성합니다.
  db.run(`
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      itemId INTEGER,
      buyerId INTEGER,
      saleDate TEXT,
      status TEXT,
      FOREIGN KEY (itemId) REFERENCES items(id),
      FOREIGN KEY (buyerId) REFERENCES users(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating sales table:', err.message);
      return;
    }
    console.log("Sales table created successfully.");
  });

});

db.close();