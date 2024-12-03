// Route 기능만 수행합니다.
// props 관리를 수행합니다.
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import MainPage from '../components/MainPage';
import Register from '../components/Register';
import Login from '../components/Login';
import MyPage from '../components/MyPage';
import ItemForm from '../components/ItemForm'; // item 등록
import ItemDetail from '../components/ItemDetail'; // item 조회
import ItemList from '../components/ItemList';
import BookForm from '../components/BookForm'; // book 등록
import BookList from '../components/BookList'; // book 리스트
import AboutPage from '../components/AboutPage';
import SearchPage from '../components/SearchPage';

const MainController = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);  // 아이템 상태 관리
  const [books, setBooks] = useState([]);  // 도서 상태 관리

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1])); // 토큰 디코딩
      setUser(user); // 상태 복원
    }
  }, []);

  // 아이템 추가 함수
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };
  // 도서 추가 함수
  const handleAddBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Main user={user} setUser={setUser} />} />
        <Route path="/main" element={<MainPage user={user} setUser={setUser} />} />
        <Route path="/items" element={<ItemList user={user} />} />
        <Route path="/items/:id" element={<ItemDetail items={items} user={user} />} />
        <Route path="/additem" element={<ItemForm user={user} onAddItem={handleAddItem} />} />
        <Route path="/books" element={<BookList user={user} onAddBook={handleAddBook} />} />
        <Route path="/books/:id" element={<ItemDetail user={user} />} />
        <Route path="/addbook" element={<BookForm user={user} onAddBook={handleAddBook} />} />
        <Route path="/listitems" element={<ItemList user={user} onAddItem={handleAddItem} />} />
        <Route path="/listbooks" element={<BookList user={user} onAddBook={handleAddBook} />} />
        <Route path="/mypage" element={<MyPage user={user} setUser={setUser} />} />
        <Route path="/register" element={<Register onRegister={(data) => setUser(data)} />} />
        <Route path="/login" element={<Login onLogin={(data) => setUser(data)} />} />
        <Route path="/search" element={<SearchPage user={user} setUser={setUser} />} />
        <Route path="/introduce" element={<AboutPage />} />{" "}
      </Routes>
      <Footer />
    </div>
  );
}

export default MainController;
