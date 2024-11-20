import React from 'react';

const ItemList = ({ items, user, onUpdateStatus }) => {
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


  return (
    <div>
      <h2>중고 물품 목록</h2>
      <div className="row">
        {items.map(item => (
          <div key={item.id} className="item" style={{ width: '250px', height: '250px' }}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.price}</p>
                {item.image && <img src={`http://localhost:3000${item.image}`} alt={item.name} style={{ maxWidth: '200px', height: 'auto' }} />}
                <p>seller:{item.sellerName}</p>
                {user && user.id === item.sellerId && (
                  <div>
                    {renderStatusButton(item)}
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

export default ItemList;
