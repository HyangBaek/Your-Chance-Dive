// SearchPage.js
import React, { useState, useEffect } from 'react';

const SearchPage = ({ user, setUser }) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage('검색어를 입력해주세요');
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [query]);


  const handleSearch = async () => {
    if (query.trim() === '') {
      setMessage('검색어를 입력해주세요');
      setResults([]);
      return;
    }
    const response = await fetch(`http://localhost:3000/api/search?q=${query}`);
    const data = await response.json();
    console.log('API 응답 데이터:', data);

    if (Array.isArray(data) && data.length === 0) {
      setMessage('검색 결과가 없습니다');
      setResults([]);
    } else {
      setMessage('');
      setResults(data);
    }
  };

  return (
    <div>
      <h1>상품 검색</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>

      {message && <p>{message}</p>}



      {/* <!-- Page Container --> */}
      <div className="w3-content w3-margin-top" style={{ maxWidth: '1400px' }}>

        {/* <!-- The Grid --> */}
        <div className="w3-row-padding">

          {/* <!-- Left Column --> */}
          <div className="w3-third">

            <div className="w3-white w3-text-grey w3-card-4">
              <div className="w3-container">
                <p>
                  <span className="w3-large"><h2>검색한 도서명</h2></span>
                  <br />

                  <input type="checkbox" /> 현재 거래 가능
                </p>
                <p><select>
                  <option>최신순</option>
                  <option>낮은 가격순</option>
                  <option>높은 가격순</option>
                </select></p>
              </div>
            </div><br />

            {/* <!-- End Left Column --> */}
          </div>

          {/* <!-- Right Column --> */}
          <div className="w3-twothird">
            {message && <p>{message}
            </p>}
            {results.map((item, index) => (
              <>
            <div className="w3-container w3-card w3-white w3-margin-bottom">
              <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>도서 이름</h2>
              <div className="w3-container">
                <h4 className="w3-opacity"><b>10000원</b></h4>
                <h5 className="w3-text-teal">지은이</h5>
                <p>{item.description}</p>
              </div>
            </div>
              </>
            ))}
            {/* <!-- End Right Column --> */}
          </div>

          {/* <!-- End Grid --> */}
        </div>

        {/* <!-- End Page Container --> */}
      </div>
    </div>
  );
};

export default SearchPage;