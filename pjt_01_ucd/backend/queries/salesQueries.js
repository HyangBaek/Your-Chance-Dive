const salesQueries = {
    createTable: `
      CREATE TABLE IF NOT EXISTS sales (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          itemId INTEGER NULL,
          bookId INTEGER NULL,
          sellerId INTEGER,
          buyerId INTEGER NULL, 
          saleDate TEXT,
          status TEXT NOT NULL,
          FOREIGN KEY (itemId) REFERENCES items(id),
          FOREIGN KEY (bookId) REFERENCES books(id),
          FOREIGN KEY (sellerId) REFERENCES users(id),
          FOREIGN KEY (buyerId) REFERENCES users(id)
          FOREIGN KEY (status) REFERENCES status_codes(code),
          CHECK (
              (itemId IS NOT NULL AND bookId IS NULL) OR 
              (itemId IS NULL AND bookId IS NOT NULL)
          )
      );
    `,
    insertSaleItem: `
      CREATE TRIGGER IF NOT EXISTS after_item_insert
      AFTER INSERT ON items
      BEGIN
        INSERT INTO sales (itemId, bookId, sellerId, status, saleDate)
        VALUES (new.id, NULL, new.sellerId, '00', datetime('now', 'localtime'));
      END;
    `,
    updateSaleStatus: `
      UPDATE sales
      SET status = ?
      WHERE id = ?;
    `,
    getSalesBySellerId: `
      SELECT sales.*, items.name AS itemName, users.username AS buyerName
      FROM sales
      JOIN items ON sales.itemId = items.id
      JOIN users ON sales.buyerId = users.id
      WHERE sales.sellerId = ?;
    `,
};
module.exports = salesQueries;
  