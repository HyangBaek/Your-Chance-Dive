import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './style/Header.module.css';

const Header = ({ user, setUser }) => {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(atob(token.split('.')[1])); // JWT에서 사용자 정보를 추출
      setUser(userData);
    }
  }, [setUser]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <header className="header">
      <nav class="w3-top">
        <div class="w3-bar w3-white w3-padding w3-card">
          <div class="w3-col s4">
            <a href="/" class="w3-bar-item w3-button"><b>숨참고</b> <span class="w3-text-gray">보물 같은 중고 거래의 깊이 있는 발견</span></a>
          </div>
          <div class="w3-col s4">
          {user ? (
            <div class="w3-container">
              <form>
                <fieldset class="w3-input w3-border w3-left" >
                  <input class="w3-input w3-left" style={{width:'90%'}} type="text" placeholder="관심 있는 물건을 검색해보세요"></input><a href="#plans" class="w3-button"> <i class='fa fa-search'></i></a>
                </fieldset>
              </form>
            </div>
          ) : (
            <>
            </>
          )} 
        </div>
        <div class="w3-right">
        {user ? (
          <>
          <a href="/mypage" class="w3-bar-item w3-button">안녕하세요, {user.username} 님!</a>
          <button className="btn btn-secondary nav-link" onClick={handleLogout}>로그아웃</button>
          </>
          ) : (
            <>
          <a href="/login" class="w3-bar-item w3-button">로그인</a>
          <a href="/register" class="w3-bar-item w3-button">회원가입</a>
              </>
          )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
