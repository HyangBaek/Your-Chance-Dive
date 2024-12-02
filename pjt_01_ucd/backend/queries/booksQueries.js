const booksQueries = {
    createTable: `
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        price REAL,
        description TEXT,
        image TEXT,
        createdAt TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
        author TEXT NULL,
        isbn TEXT UNIQUE NULL,
        publisher TEXT NULL,
        edition INTEGER NULL,
        sellerId INTEGER NOT NULL,
        FOREIGN KEY (sellerId) REFERENCES users(id)
    );
    `,
    insertBook: `
      INSERT INTO books (title, price, description, image, createdAt, author, isbn, publisher, edition, sellerId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    getAllBooks: `
      SELECT * FROM books;
    `,
    getBookById: `
      SELECT * FROM books WHERE id = ?;
    `,
};
module.exports = booksQueries;