import React, { useEffect, useState } from 'react';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import Login from './Login'; // 로그인 컴포넌트 임포트
import MyPage from './MyPage';

const Main = ({ user, setUser }) => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [view, setView] = useState('items'); // 새로운 상태 추가

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/items');
        const data = await response.json();
        console.log('Fetched items:', data); // 로그 추가 
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
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
    <div>
      {user ? (
        <>
          <button className="btn btn-primary" onClick={() => setView('items')}>물품 목록 보기</button>
          
          {view === 'items' && (
            <>
              {user && <ItemForm onAddItem={handleAddItem} currentItem={currentItem} />}
              <ItemList items={items} user={user} onUpdateStatus={handleUpdateStatus} />
            </>
          )}

        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Main;