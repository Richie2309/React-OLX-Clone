import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const navigate = useNavigate('');

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailErr('');
    setPasswordErr('');

    if (email.trim() === '') {
      setEmailErr('Email is required');
      return;
    }

    if (password.trim() === '') {
      setPasswordErr('Password is required');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === 'auth/invalid-credential') {
        setPasswordErr('Invalid email or Wrong password ');
      } else {
        console.log('Error:', error);
      }
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src='https://raw.githubusercontent.com/Packapeer/React_tutorial_olx_clone/45804c484250cb8c7bd9081c67f37c0582c23739/assets/images/olx-logo.svg' alt="OLX Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            value={email}
          />
          <br />
          <small style={{ color: 'red' }}>{emailErr}</small>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            value={password}
          />
          <br />
          <small style={{ color: 'red' }}>{passwordErr}</small>
          <br />
          <button>Login</button>
        </form>
        <br/>
        <Link to={'/signup'}>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
