import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import style from './style/Header.module.css';
import searchIcon from '../images/searchicon.png'; // 이미지 파일 임포트

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(atob(token.split('.')[1])); // JWT에서 사용자 정보를 추출
      setUser(userData);
    }
  }, [setUser]);

  const handleGoToMyPage = () => {
    navigate('/mypage');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <header className="header">
      <nav className="w3-top">
        <div className="w3-bar w3-white w3-padding w3-card">
          <div className="w3-col s4">
            <a href="/" className="w3-bar-item w3-button"><b>숨참고</b> <span className="w3-text-gray">보물 같은 중고 거래의 깊이 있는 발견</span></a>
          </div>
          <div className="w3-col s4">
          {user ? (
              <div className="w3-container w3-center">
              <form>
                  <input style={{ width: '90%', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '15px', backgroundColor: 'white', backgroundImage: `url(${searchIcon})`, backgroundPosition: '95% 12px', backgroundRepeat: 'no-repeat', padding: '12px 20px 12px 20px', transition: 'width 0.4s ease-in-out', }} type="text" placeholder="관심 있는 물건을 검색해보세요"></input><a href="#plans" className="w3-button"></a>
              </form>
            </div>
          ) : (
            <>
            </>
          )} 
        </div>
          <div className="w3-right">
        {user ? (
          <>
                <a href="/mypage" className="w3-bar-item w3-button" onClick={handleGoToMyPage}>안녕하세요, {user.username} 님!</a>
          <button className="btn btn-secondary nav-link" onClick={handleLogout}>로그아웃</button>
          </>
          ) : (
            <>
                <a href="/login" className="w3-bar-item w3-button">로그인</a>
                <a href="/register" className="w3-bar-item w3-button">회원가입</a>
              </>
          )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;