import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import style from './style/Login.module.css';

const Login = ({ onLogin = () => { } }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = { email, password };
    console.log('Submitted email:', email);
    console.log('Submitted password:', password);

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token);
          const user = JSON.parse(atob(data.token.split('.')[1])); // 토큰 디코딩
          onLogin(data); // 부모 컴포넌트로 로그인 정보 전달
          navigate('/');
        } else {
          setError('Login successful, but no token received.');
        }
      } else {
        const errorMessage = data.error || 'Login failed. Please check your credentials.';
        setError(errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
      {error && <div className="alert alert-danger">{error}</div>}
        <div className={style.title}>
          <span>Welcome</span>
        </div>
        <p className={style.title_para}>Please enter your details to sign in.</p>

        <form onSubmit={handleSubmit}>
          <div className={style.row}>
            <input
              type="text"
              placeholder="Enter your email..."
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
          <div className={style.row}>
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <div className={style.row}>
            <input type="submit" value="Login" />
          </div>
          <div className={style.signuplink}>
            Not a member? <Link to="/register">Signup now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
