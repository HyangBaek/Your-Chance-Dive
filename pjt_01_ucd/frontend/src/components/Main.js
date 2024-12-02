import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import BookForm from './BookForm';
import BookList from './BookList';
import Login from './Login'; // 로그인 컴포넌트 임포트
import MyPage from './MyPage';
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
    const fetchItems = async () => {
      try {
        const responses = await Promise.all([
          fetch('http://localhost:3000/api/items'),
          fetch('http://localhost:3000/api/books')
        ]);
        // 각 응답을 JSON으로 변환
        const [itemsData, booksData] = await Promise.all(
          responses.map(response => response.json()));
        // 상태 업데이트
        setItems(itemsData);
        setBooks(booksData);
        console.log('Fetched items ok'); // 로그 추가 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItems();
  }, []);

  const handleLogin = (data) => {
    const userData = JSON.parse(atob(data.token.split('.')[1])); // JWT에서 사용자 정보를 추출
    setUser(userData);
    localStorage.setItem('token', data.token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
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
          <MainPage /> {/* Slider 컴포넌트를 사용합니다. */}
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      {/* <button className="btn btn-primary" onClick={() => setView('items')}>물품 목록 보기</button> */}

      {/* {view === 'items' && (
        <>
          {user && <ItemForm onAddItem={handleAddItem} currentItem={currentItem} />}
          <ItemList items={items} user={user} onUpdateStatus={handleUpdateStatus} />
        </>
      )} */}
      {/* <ItemList items={items} user={user} onUpdateStatus={handleUpdateStatus} />
      <BookList items={books || []} user={user} onUpdateStatus={handleUpdateStatus} /> */}
    </div>
  );
};

export default Main;