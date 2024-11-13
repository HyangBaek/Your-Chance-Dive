// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ItemForm = ({ onAddItem }) => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('price', price);
//     formData.append('description', description);
//     if (image) { formData.append('image', image); }

//     fetch('http://localhost:3000/api/items', {
//       method: 'POST',
//       body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Item added:', data);
//       // 폼 초기화
//       setName('');
//       setPrice('');
//       setDescription('');
//       setImage(null);
//       // 아이템 목록 새로고침
//       onAddItem(data);
//       // 물품 목록 페이지로 리디렉션
//       navigate('/');
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       <div className="form-group">
//         <label htmlFor="name">아이템 이름</label>
//         <input
//           type="text"
//           className="form-control"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="price">가격</label>
//         <input
//           type="number"
//           className="form-control"
//           id="price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="description">설명</label>
//         <textarea
//           className="form-control"
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         ></textarea>
//       </div>
//       <div className="form-group">
//         <label htmlFor="image">이미지</label>
//         <input type="file" className="form-control" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
//       </div>
//       <button type="submit" className="btn btn-primary">추가</button>
//     </form>
//   );
// };

// export default ItemForm;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ItemForm = ({ onAddItem, currentItem }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name);
      setPrice(currentItem.price);
      setDescription(currentItem.description);
    }
  }, [currentItem]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    const url = currentItem ? `http://localhost:3000/api/items/${currentItem.id}` : 'http://localhost:3000/api/items';
    const method = currentItem ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Authorization': localStorage.getItem('token') || ''
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        if (currentItem) {
          // 아이템 업데이트 시 로직 추가
          console.log('Item updated:', data);
        } else {
          // 새로운 아이템 추가 시 로직 추가
          console.log('Item added:', data);
          onAddItem(data);
        }
        navigate('/');
      }
    })
    .catch(error => {
      setError('An error occurred. Please try again later.');
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>{currentItem ? '게시물 수정' : '새 게시물 추가'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label htmlFor="name">아이템 이름</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">가격</label>
        <input
          type="number"
          className="form-control"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">설명</label>
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="image">이미지</label>
        <input
          type="file"
          className="form-control"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button type="submit" className="btn btn-primary">{currentItem ? '수정' : '추가'}</button>
    </form>
  );
};

export default ItemForm;
