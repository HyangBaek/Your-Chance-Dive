// Route 기능만 수행합니다.
// props 관리를 수행합니다.
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Main from '../components/Main';
import MainPage from '../components/MainPage';
import Register from '../components/Register';
import Login from '../components/Login';
import MyPage from '../components/MyPage';
import ItemForm from '../components/ItemForm'; // item 등록
import ItemDetail from '../components/ItemDetail'; // item 조회
import AboutPage from '../components/AboutPage';
import SearchPage from '../components/SearchPage';

const MainController = ({ user, setUser }) => {
  const [items, setItems] = useState([]);  // 아이템 상태 관리
  const [books, setBooks] = useState([]);  // 도서 상태 관리

  // 아이템 추가 함수
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <Routes>
      <Route path="/" element={<Main user={user} setUser={setUser} />} />
      <Route path="/main" element={<MainPage user={user} setUser={setUser} />} />
      <Route path="/items/:id" element={<ItemDetail user={user} />} />
      <Route path="/additem" element={<ItemForm user={user} onAddItem={handleAddItem} />} />
      <Route path="/mypage" element={<MyPage user={user} setUser={setUser} />} />
      <Route path="/register" element={<Register onRegister={(data) => setUser(data)} />} />
      <Route path="/login" element={<Login user={user} setUser={setUser} />} />
      <Route path="/search" element={<SearchPage user={user} setUser={setUser} />} />
      <Route path="/introduce" element={<AboutPage />} />{" "}
    </Routes>
  );
}

export default MainController;
