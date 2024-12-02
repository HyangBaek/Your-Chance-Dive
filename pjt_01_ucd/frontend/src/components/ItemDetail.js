import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItems } from "../api/itemApi";

const ItemDetail = ({ user, onRequestTrade }) => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // 아이템을 찾는 로직
  const item = items.find(item => item.id === parseInt(id));
  console.log("Route Parameter ID:", id);
  console.log("Items:", items);

  // user가 존재하고, items가 비어 있을 때만 fetchItems 호출
  useEffect(() => {
    if (user && items.length === 0) {
      fetchItems()
        .then(setItems)
        .catch((error) => console.error("Error:", error));
    }
  }, [user, items.length]);  // user 또는 items.length가 변경될 때만 호출

  if (!item) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const handleTradeRequest = () => {
    try {
      onRequestTrade(item.id);
      alert('거래 요청이 전송되었습니다.');
      navigate('/'); // '/'가 올바른 경로인지 확인
    } catch (error) {
      console.error("Error during trade request:", error);
    }
  };

  return (
    <div className="item-detail">
      <div className="w3-container w3-content" style={{ maxWidth: '1100px', marginTop: '80px' }}>
        <label htmlFor="name">아이템 이름</label>
        <input
          type="text"
          className="form-control"
          id="name"
          defaultValue={item.name}
          readOnly
        />
        <label htmlFor="price">가격</label>
        <input
          type="number"
          className="form-control"
          id="price"
          defaultValue={item.price}
          readOnly
        />
        <label htmlFor="description">설명</label>
        <textarea
          className="form-control"
          id="description"
          defaultValue={item.description}
          readOnly
        ></textarea>
        <label htmlFor="image">이미지</label>
        {item.image && <img src={`http://localhost:3000${item.image}`} alt={item.name} style={{ maxWidth: '400px', height: 'auto' }} />}

        <p>상태: {item.status}</p>
        <p>판매자: {item.sellerName}</p>

        {user && user.id !== item.sellerId && (
          <button className="btn btn-primary" onClick={handleTradeRequest}>
            거래 요청
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
