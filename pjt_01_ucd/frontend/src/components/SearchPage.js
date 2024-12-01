// SearchPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom'; // React Router 훅

const SearchPage = ({ user, setUser }) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();

  // 검색 함수
  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      console.log('검색어가 비어 있습니다. 검색 실행 중단.');
      setMessage('검색어를 입력해주세요');
      setResults([]);
      return;
    }

    console.log('검색 실행, query:', query); // 디버깅용 콘솔
    try {
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
    } catch (error) {
      console.error('검색 중 오류:', error);
      setMessage('검색 중 오류가 발생했습니다.');
    }
  }, [query]);

  // URL에서 query 읽기
  useEffect(() => {
    const params = new URLSearchParams(location.search); // URLSearchParams로 Query String 파싱
    const searchQuery = params.get('q') || ''; // 'q' 파라미터 가져오기
    console.log('URL에서 읽은 query:', searchQuery); // 디버깅용 콘솔
    setQuery(searchQuery);
  }, [location.search]);

  // query 상태가 변경되면 검색 실행
  useEffect(() => {
    if (query.trim()) {
      handleSearch(); // query가 설정된 이후에만 검색 실행
    }
  }, [query, handleSearch]);

  // Enter 키 이벤트 리스너 설정
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // 클린업: 이전 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSearch]);

  return (
    <div className="w3-container w3-content" style={{ width: '90%', maxWidth: '1100px', marginTop: '80px' }}>
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
                <br />
                <span className="w3-large"><h2>검색한 도서명</h2></span>
                <br />

                <input type="checkbox" /> 현재 거래 가능
                <br />
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
            {results.length > 0 ? (
              <>
                {results.map((item, index) => (
                  <>
                    <div className="w3-container w3-card w3-white w3-margin-bottom">
                      <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-cube fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>{item.name}</h2>
                      <div className="w3-container">
                        <h4 className="w3-opacity"><b>{item.price}</b></h4>
                        {/* <h5 className="w3-text-teal">{item.price}</h5> */}
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </>
                ))}
              </>
            ) : (
              <div className="w3-container w3-card w3-white w3-margin-bottom">
                <h6 className="w3-text-grey w3-padding-16">{message && <p>{message}</p>}</h6>
              </div>
            )}

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