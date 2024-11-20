import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './style/Login.module.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // 인증 토큰을 로컬 스토리지에 저장
        onLogin(data);
        navigate('/');
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
    <div className={style}>
    <div className={style.container}>
      <div className={style.wrapper}>
      {error && <div className="alert alert-danger">{error}</div>}
        <div className={style.title}>
          <span>Welcome</span>
        </div>
        <p className={style.title_para}>Please enter your details to sign in.</p>

        <form onSubmit={handleSubmit}>
          <div className={style.row}>
            <input type="text" placeholder="Enter your email..." 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
          </div>
          <div className={style.row}>
            {/* <i className="fas fa-lock"></i> */}
            <input type="password" placeholder="Password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
          </div>
          <div className={style.row}>
            <input type="submit" value="Login" />
          </div>
          <div className={style.signuplink}>Not a member? <a href="/register">Signup now</a></div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;