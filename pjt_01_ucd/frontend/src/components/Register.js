import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const registerData = {
      username,
      password,
      email,
    };

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.status === 201) {
        onRegister(data);
        alert('가입을 축하합니다!\n지금부터 숨겨진 보물을 찾아보세요~!\n\n로그인을 진행해주세요.'); // 성공 알림창 띄우기
        navigate('/'); // 로그인되어 있지 않으면 로그인 화면으로 이동
      } else {
        setError(data.error);
        alert(data.error); // 알림창 띄우기
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <>
      <br /><br /><br /><br />
      <div className="w3-content" style={{ 'max-width': '1100px' }}>
        <div className="w3-container"></div>
        <form onSubmit={handleSubmit}>
          <div className="w3-section"><br /><br /></div>
          <h2>회원가입</h2>
          <br />
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="w3-section">
            <label htmlFor="username">사용자 이름</label>
            <input
              type="text"
              className="w3-input w3-border"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="w3-section">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              className="w3-input w3-border"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="w3-section">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              className="w3-input w3-border"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
          </div>
          <button type="submit" className="w3-button w3-black w3-margin-bottom">회원가입</button>
        </form>
      </div>
      <br /><br /><br /><br />
    </>
  );
};

export default Register;
