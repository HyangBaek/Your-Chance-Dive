import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';  // useLocation 훅 임포트
import style from './style/Header.module.css';
import searchIcon from '../images/searchicon.png'; // 이미지 파일 임포트
import Sideber from './Sideber';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();  // 현재 경로 정보 가져오기

  // 경로가 "/search"일 경우 검색창(input)을 숨김
  const isSearchPage = location.pathname.startsWith('/search');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 로그인 상태 유지
      const userData = JSON.parse(atob(token.split('.')[1])); // JWT에서 사용자 정보를 추출
      setUser(userData); // 부모 컴포넌트로 사용자 정보 업데이트
    }
  }, [setUser]); // setUser가 바뀔 때마다 실행

  const handleGoToMyPage = () => {
    navigate('/mypage');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <nav className="w3-top">
        <div className="w3-bar w3-white w3-padding w3-card">
          <div className="w3-col s4">
            <Link to="/" className="w3-bar-item w3-button"><b>숨참고</b> <span className="w3-text-gray w3-hide-small">보물 같은 중고 거래의 깊이 있는 발견</span></Link>
          </div>
          <div className="w3-col s4">
            {user ? (
              <>
                {/* 검색창만 조건부로 숨김 */}
                {!isSearchPage && (
                  <div className="w3-container w3-center w3-hide-small">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const query = e.target.elements.search.value; // 검색어 추출
                        window.location.href = `/search?q=${encodeURIComponent(query)}`;
                      }}
                    >
                      <input
                        type="text"
                        name="search"
                        placeholder="관심 있는 물건을 검색해보세요"
                        
                        style={{ width: '90%', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '15px', backgroundColor: 'white', backgroundImage: `url(${searchIcon})`, backgroundPosition: '95% 12px', backgroundRepeat: 'no-repeat', padding: '12px 20px 12px 20px', transition: 'width 0.4s ease-in-out', }}
                      />
                    </form>
                  </div>
                )}
              </>
            ) : (
              <>
              </>
            )}
          </div>
          <div className="w3-right">
            {user ? (
              <div className="">
                <Link to="/mypage" className="w3-bar-item w3-button" onClick={handleGoToMyPage}>안녕하세요, {user.username} 님!</Link>
                <button className="btn btn-secondary nav-link w3-white" onClick={handleLogout} style={{ 'marginRight': '50px' }}>로그아웃</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="w3-bar-item w3-button">로그인</Link>
                <Link to="/register" className="w3-bar-item w3-button">회원가입</Link>
              </>
            )}
            {user ? (
              <>
                <Sideber /> {/* Sideber 컴포넌트를 사용합니다. */}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
