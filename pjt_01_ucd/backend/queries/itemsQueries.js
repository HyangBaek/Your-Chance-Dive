const itemsQueries = {
    createTable: `
      CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          price REAL,
          description TEXT,
          image TEXT,
          createdAt TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
          sellerId INTEGER,
          FOREIGN KEY (sellerId) REFERENCES users(id)
      );
    `,
    insertItem: `
      INSERT INTO items (name, price, description, image, createdAt, sellerId)
      VALUES (?, ?, ?, ?, ?, ?);
    `,
    getAllItems: `
      SELECT * FROM items;
    `,
    getItemById: `
      SELECT * FROM items WHERE id = ?;
    `,
};
module.exports = itemsQueries;
  