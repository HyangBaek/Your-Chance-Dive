import React, { useState, useEffect } from 'react';
import { fetchBooks } from "../api/bookApi";

const BookList = ({ user, onUpdateStatus }) => {
  const [books, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 상태 버튼 렌더링 함수
  const renderStatusButton = (item) => {
    const statuses = ['판매 중', '거래 중', '판매 완료'];

    return statuses.map((status) => (
      <button
        key={status}
        className={`btn ${item.status === status ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => onUpdateStatus(item.id, status)}
      >
        {status}
      </button>
    ));
  };

  // 아이템 데이터를 가져오는 useEffect
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const fetchedItems = await fetchBooks(); // 아이템 가져오는 API 호출
        setItems(fetchedItems);
      } catch (error) {
        setError('물품 정보를 불러오는 데 실패했습니다.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []); // 빈 배열을 사용하여 컴포넌트 마운트 시 한 번만 실행

  // 로딩 중이면 로딩 메시지 출력
  if (loading) {
    return <p>로딩 중...</p>;
  }

  // 에러가 발생하면 에러 메시지 출력
  if (error) {
    return <p>{error}</p>;
  }

  // 아이템이 없으면 안내 메시지 출력
  if (books.length === 0) {
    return <p>등록된 물품이 없습니다.</p>;
  }

  // 정상적으로 데이터가 있을 때 렌더링
  return (
    <div>
      <h2>도서 목록</h2>
      <div className="row">
        {books.map(book => (
          <div key={book.id} className="book" style={{ width: '250px', height: '250px' }}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.price}</p>
                {book.image && <img src={`http://localhost:3000${book.image}`} alt={book.name} style={{ maxWidth: '200px', height: 'auto' }} />}
                <p>seller:{book.sellerName}</p>
                {user && user.id === book.sellerId && (
                  <div>
                    {renderStatusButton(book)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
