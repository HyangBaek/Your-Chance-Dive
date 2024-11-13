import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">중고 거래 사이트</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {user ? (
                <>
                  <li className="nav-item">
                  <a className="nav-link" href="/mypage"><span className="nav-link">안녕하세요, {user.username}님!</span></a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/mypage">마이페이지</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-secondary nav-link" onClick={handleLogout}>로그아웃</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">로그인</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">회원가입</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
