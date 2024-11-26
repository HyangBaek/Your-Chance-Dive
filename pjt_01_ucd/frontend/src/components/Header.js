import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import style from './style/Header.module.css';
import searchIcon from '../images/searchicon.png'; // 이미지 파일 임포트

const Header = ({ user, setUser }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
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

  const openNav = () => {
    setSidebarOpen(true);
  };
  
  const closeNav = () => {
    setSidebarOpen(false);
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
                <button className="btn btn-secondary nav-link w3-white" onClick={handleLogout} style={{ 'margin-right': '50px'}}>로그아웃</button>
          </>
          ) : (
            <>
                <a href="/login" className="w3-bar-item w3-button">로그인</a>
                <a href="/register" className="w3-bar-item w3-button">회원가입</a>
              </>
          )}
            {user ? (
              <>
                {/* <!-- Menu icon to open sidebar --> */}
                <span onClick={openNav} class="w3-button w3-top w3-white w3-text-grey" style={{ width: 'auto', right: 0, 'margin-top': '8px', 'margin-right': '8px' }}><i class="fa fa-bars"></i></span>


                {/* <!-- Hidden Sidebar (reveals when clicked on menu icon)--> */}
                <nav class="w3-sidebar w3-white w3-animate-right w3-large w3-right w3-card" id="mySidebar" style={{ width: isSidebarOpen ? '20%' : '0', right: 0, display: isSidebarOpen ? 'block' : 'none', 'margin-top': '18px' }}>
                  <a href="javascript:void(0)" onclick="closeNav()" class="w3-button w3-light-gray w3-large w3-display-topright w3-center" style={{ padding: `0 '12px'`, 'margin-top': '8px', 'margin-right': '8px' }}>
                    <i class="fa fa-remove" onClick={closeNav}></i>
                  </a>
                  <div class="w3-bar-block" style={{ 'margin-top': '60px' }}>
                    <a href="/" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">Home</a>
                    <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">My Porfile</a>
                    <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">My Events</a>
                    <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">My Message</a>
                    <a href="/additem" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">판매 상품 등록</a>
                    <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">판매 중인 상품</a>
                    <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">예약 중인 상품</a>
                    <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">구매 완료 상품</a>
                    <a href="#" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">판매 완료 상품</a>
                    <a href="#about" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">About</a>
                    <a href="#contact" class="w3-bar-item w3-button w3-text-grey w3-hover-light-gray" onclick="closeNav()">Contact</a>
                  </div>
                </nav>
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
