import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ItemDetail = ({ items, user, onRequestTrade }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = items.find(item => item.id === parseInt(id));

  if (!item) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const handleTradeRequest = () => {
    onRequestTrade(item.id);
    alert('거래 요청이 전송되었습니다.');
    navigate('/');
  };

  return (
    <div className="item-detail">
      <h2>{item.name}</h2>
      <p>가격: {item.price}</p>
      <p>설명: {item.description}</p>
      <p>상태: {item.status}</p>
      <p>판매자: {item.sellerName}</p>
      {item.image && <img src={`http://localhost:3000${item.image}`} alt={item.name} style={{ maxWidth: '400px', height: 'auto' }} />}
      {user && user.id !== item.sellerId && (
        <button className="btn btn-primary" onClick={handleTradeRequest}>
          거래 요청
        </button>
      )}
    </div>
  );
};

export default ItemDetail;
