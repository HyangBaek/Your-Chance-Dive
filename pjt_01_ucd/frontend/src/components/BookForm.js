import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookForm = ({ onAddBook, currentBook }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publisher, setPublisher] = useState('');
  const [edition, setEdition] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentBook) {
      setTitle(currentBook.title);
      setPrice(currentBook.price);
      setDescription(currentBook.description);
      setAuthor(currentBook.author);
      setIsbn(currentBook.isbn);
      setPublisher(currentBook.publisher);
      setEdition(currentBook.edition);
    }
  }, [currentBook]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    if (author) { formData.append('author', author); }
    if (isbn) { formData.append('isbn', isbn); }
    if (publisher) { formData.append('publisher', publisher); }
    if (edition) { formData.append('edition', edition); }
    if (image) {
      formData.append('image', image);
    }

    const url = currentBook ? `http://localhost:3000/api/book/${currentBook.id}` : 'http://localhost:3000/api/book';
    const method = currentBook ? 'PUT' : 'POST';
    console.log(localStorage.getItem('token'));

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
          if (currentBook) {
            // 교재 도서 업데이트 시 로직 추가
            console.log('Book updated:', data);
          } else {
            // 새로운 교재 도서 추가 시 로직 추가
            console.log('Book added:', data);
            onAddBook(data);
          }
          navigate('/');
          console.log('navigate04');
        }
      })
      .catch(error => {
        setError('An error occurred. Please try again later.');
        console.error('Error:', error);
      });
  };

  return (
    <div className="w3-content">
      <br /><br /><br /><br />
      <div className="w3-container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h2>{currentBook ? '중고 교재 등록 수정' : '중고 교재 등록'}</h2><br />
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group">
            <label htmlFor="title">교재명</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
          <div className="form-group">
            <label htmlFor="author">저자</label>
            <input
              type="text"
              className="form-control"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              className="form-control"
              id="isbn"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="publisher">출판사</label>
            <input
              type="text"
              className="form-control"
              id="publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="edition">판</label>
            <input
              type="text"
              className="form-control"
              id="edition"
              value={edition}
              onChange={(e) => setEdition(e.target.value)}
            />
          </div>
          <button type="submit" className="w3-button w3-black w3-padding-large" >{currentBook ? '수정' : '등록'}</button>
        </form>
        <br />
      </div>
    </div>
  );
};

export default BookForm;
