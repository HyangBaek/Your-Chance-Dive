const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const app = express();

const SECRET_KEY = 'your_secret_key';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const db = new sqlite3.Database('./database.sqlite');
const itemssQueries = require('./queries/itemsQueries');
const salesQueries = require('./queries/salesQueries');
const usersQueries = require('./queries/usersQueries');
const booksQueries = require('./queries/booksQueries');

// 파일 업로드를 위한 multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// 인증 미들웨어
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }
    req.user = user;
    next();
  });
};

// 게시물 등록 라우트
app.post('/api/items', [authenticateToken, upload.single('image')], (req, res) => {
  const name = req.body.name || 'Unnamed Item';
  const price = req.body.price || 0;
  const description = req.body.description || 'No description available';
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  const createdAt = new Date().toISOString();
  const sellerId = req.user.id;

  db.run("INSERT INTO items (name, price, description, image, createdAt, sellerId) VALUES (?, ?, ?, ?, ?, ?)", 
  [name, price, description, image, createdAt, sellerId], 
  function(err) {
    if (err) {
      console.error('Error inserting item:', err.message);
      return res.status(500).json({ error: err.message });
    }
    const newItem = { id: this.lastID, name, price, description, image, createdAt, sellerId };
    res.status(201).json(newItem);
  });
});

// 게시물 목록 가져오기 라우트 (인증 필요 없음)
app.get('/api/items', (req, res) => {
  db.all("SELECT items.*, users.username AS sellerName FROM items JOIN users ON items.sellerId = users.id", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// 게시물 수정 라우트
app.put('/api/items/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  // 게시물의 소유자인지 확인합니다.
  db.get("SELECT * FROM items WHERE id = ? AND sellerId = ?", [id, req.user.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(403).json({ error: 'Not authorized to update this item' });
    }

    db.run("UPDATE items SET name = ?, price = ?, description = ? WHERE id = ?", 
    [name, price, description, id], function(err) {
      if (err) {
        console.error('Error updating item:', err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Item updated successfully' });
    });
  });
});


// 사용자 등록
app.post('/api/register', (req, res) => {
  const { username, password, email } = req.body;
  const createdAt = new Date().toISOString();

  // 이메일 중복 확인
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (err) {
      console.error('Error checking email:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (row) {
      return res.status(400).json({ error: '이미 존재하는 이메일입니다.' });
    }

    // 이메일 중복이 아닌 경우 사용자 등록
    db.run("INSERT INTO users (username, password, email, createdAt) VALUES (?, ?, ?, ?)", [username, password, email, createdAt], function(err) {
      if (err) {
        console.error('Error registering user:', err.message);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
      }
      const newUser = { id: this.lastID, username, email, createdAt };
      console.log('New user added:', newUser);
      res.status(201).json(newUser); // 상태 코드 201을 사용하여 성공 응답을 반환합니다.
    });
  });
});


// 사용자 로그인
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
    if (err) {
      console.error('Error logging in:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      console.log('row:', row); // 전체 row 객체 출력
      console.log('row.email:', row.email);
      const token = jwt.sign({ id: row.id, username: row.username, email: row.email }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// 보호된 라우트 예시
app.get('/api/protected', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }

    res.json({ message: 'This is a protected route', user: decoded });
  });
});

// 사용자 목록 가져오기 라우트
app.get('/api/users', (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// 사용자 정보 가져오기 라우트
app.get('/api/users/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  // 사용자 정보 조회
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

// 사용자 정보 업데이트 라우트
app.put('/api/users/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;  // 업데이트할 사용자 정보

  // 사용자가 존재하는지 확인하고, 업데이트 작업 수행
  db.run("UPDATE users SET username = ?, email = ? WHERE id = ?", [username, email, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  });
});


// 판매 상태 업데이트 라우트
app.post('/api/sales', authenticateToken, (req, res) => {
  const { itemId, buyerId, saleDate, status } = req.body;

  db.run("INSERT INTO sales (itemId, buyerId, saleDate, status) VALUES (?, ?, ?, ?)", 
  [itemId, buyerId, saleDate, status], function(err) {
    if (err) {
      console.error('Error inserting sale:', err.message);
      return res.status(500).json({ error: err.message });
    }
    const newSale = { id: this.lastID, itemId, buyerId, saleDate, status };

    // items 테이블에서 상태 업데이트
    db.run("UPDATE items SET status = ? WHERE id = ?", [status, itemId], function(err) {
      if (err) {
        console.error('Error updating item status:', err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json(newSale);
    });
  });
});

// 판매 상태 목록 가져오기 라우트
app.get('/api/sales', (req, res) => {
  const { sellerId } = req.query;

  // sellerId가 주어진 경우 필터링
  const query = sellerId
    ? "SELECT sales.*, items.name AS itemName, users.username AS buyerName FROM sales JOIN items ON sales.itemId = items.id JOIN users ON sales.buyerId = users.id WHERE items.sellerId = ?"
    : "SELECT sales.*, items.name AS itemName, users.username AS buyerName FROM sales JOIN items ON sales.itemId = items.id JOIN users ON sales.buyerId = users.id";

  const params = sellerId ? [sellerId] : [];

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ status: rows ? row.status : 'not found' });
  });
});

// 검색
app.get('/api/search', (req, res) => {
  const query = req.query.q;
  const sql = `
    SELECT * FROM items
    WHERE name LIKE '%' || ? || '%'
       OR description LIKE '%' || ? || '%'
  `;
  db.all(sql, [query, query], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log('row:', rows);
    res.json(rows);
  });
})

// 교재 등록 라우트
app.post('/api/book', [authenticateToken, upload.single('image')], (req, res) => {
  const title = req.body.title || 'Unnamed Item';
  const price = req.body.price || 0;
  const description = req.body.description || 'No description available';
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  const createdAt = new Date().toISOString();
  // 값이 없을 경우 NULL로 처리
  const author = req.body.author || null;
  const isbn = req.body.isbn || null;
  const publisher = req.body.publisher || null;
  const edition = req.body.edition || null;

  const sellerId = req.user.id; // 인증 토큰에서 추출

  // 필수 입력값 검증
  if (!title) {
    return res.status(400).json({
      error: 'Title are required fields.'
    });
  }

  // 데이터베이스에 삽입
  db.run(booksQueries.insertBook,
  [title, price, description, image, createdAt, author, isbn, publisher, edition, sellerId],
  function(err) {
    if (err) {
      console.error('Error inserting item:', err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log('/api/book 02');
    // 성공 응답
    const newBook = { id: this.lastID, title, price, description, image, createdAt, author, isbn, publisher, edition, sellerId };
    res.status(201).json(newBook);
    console.log('New book added:', newBook);
  });
});

// 전체 목록 가져오기 라우트 (인증 필요 없음)
app.get('/api/books', (req, res) => {
  db.all(booksQueries.getAllBooks, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
    console.log('/api/books ok ', rows);
  });
});

// 서버 시작
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
