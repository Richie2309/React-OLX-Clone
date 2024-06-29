import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { auth, db } from '../../firebase/config'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [validation, setValidation] = useState({ usernameErr: '', emailErr: '', phoneErr: '', passwordErr: '' })

  const navigate = useNavigate('')

  const handleInputChange = (inputName) => {
    setValidation(prevValidation => ({ ...prevValidation, [`${inputName}Err`]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth2 = getAuth()

    if (username.trim() === '' || email.trim() === '' || phone.trim() === '' || password.trim() === '') {
      setValidation({ usernameErr: 'This field is required', emailErr: 'This field is required', phoneErr: 'This field is required', passwordErr: 'This field is required' })
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // user.displayName = username;
        await updateProfile(auth2.currentUser, {
          displayName: username,
        });

        try {
          const docRef = await addDoc(collection(db, "Users"), {
            id: user.uid,
            userName: username,
            PhoneNumber: phone,
          });
          console.log(docRef, 'Document written with ID: ', docRef.id);
        } catch (err) {
          console.error("Error adding document: ", err);
        }

        navigate("/login")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src='https://raw.githubusercontent.com/Packapeer/React_tutorial_olx_clone/45804c484250cb8c7bd9081c67f37c0582c23739/assets/images/olx-logo.svg' alt='olx logo' />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => {setUsername(e.target.value); handleInputChange('username');}}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <small style={{ color: 'red' }}>{validation.usernameErr}</small><br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => {setEmail(e.target.value); handleInputChange('email');}}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <small style={{ color: 'red' }}>{validation.emailErr}</small><br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => {setPhone(e.target.value); handleInputChange('phone');}}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <small style={{ color: 'red' }}>{validation.phoneErr}</small><br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value); handleInputChange('password');}}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <small style={{ color: 'red' }}>{validation.passwordErr}</small>
          <br />
          <button type="submit">Signup</button>
        </form>
        <br />
        <Link to={'/login'}>Login</Link>
      </div>
    </div>
  );
}

