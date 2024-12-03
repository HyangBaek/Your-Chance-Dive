import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './Login'; // 로그인 컴포넌트 임포트
import MainPage from '../components/MainPage';

const Main = ({ user, setUser }) => {
  const [items, setItems] = useState([]);
  const [books, setBooks] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentBook, setCurrentBook] = useState(null);
  const [view, setView] = useState(['items', 'items']); // 새로운 상태 추가
  const navigate = useNavigate();
  console.log('Main Component - user:', user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    }
    if (user) {
      console.log('User updated:', user); // 업데이트 확인
    }
  }, []);

  // 서버에서 사용자 정보를 가져오는 함수
  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data); // 사용자 정보 상태 업데이트
      } else {
        localStorage.removeItem('token'); // 토큰이 유효하지 않으면 삭제
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogin = (data) => {
    console.log('Before setUser:', user); // 이전 상태
    const userData = JSON.parse(atob(data.token.split('.')[1])); // JWT에서 사용자 정보를 추출
    setUser(userData);
    console.log('After setUser:', user); // 비동기라 이전 상태가 나올 가능성 있음
    localStorage.setItem('token', data.token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const handleEditItem = (item) => {
    // 수정 기능을 구현합니다. 예를 들어, 수정 폼을 표시하거나, 다른 페이지로 이동할 수 있습니다.
    console.log(`Editing item: ${item.name}`);
    setCurrentItem(item);
  };

  const handleUpdateStatus = async (itemId, status) => {
    try {
      const response = await fetch('http://localhost:3000/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ itemId, status, saleDate: new Date().toISOString(), buyerId: user.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        return;
      }

      const updatedItem = await response.json();
      alert(`상태가 '${status}'로 업데이트되었습니다.`);
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '1100px', marginTop: '80px' }}>
      {user ? (
        <>
          <MainPage />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Main;