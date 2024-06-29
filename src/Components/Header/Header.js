import React, { useContext, useState } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate('');

  console.log("User in Header:", user);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleLogout = () => {
    setShowLogout((prevState) => !prevState);
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div>
          <Link to={'/'}><OlxLogo></OlxLogo></Link>
        </div>
        <div>
          <div className='select'>
            <Search></Search>
            <select name="country" id="" className='selectBox'>
              <option value="India">India</option>
            </select>
          </div>
        </div>
        <div>
          <div className='searchInput'>
            <input
              type="text"
              className='searchField'
              placeholder='Find Cars, Mobile Phones and more...'
            />
            <button className='btn'><Search></Search></button>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <div className="profileSection">
              <div className="profileIcon" onClick={toggleLogout}>
                {/* <img
                  src="https://icons.veryicon.com/png/o/photographic/kv-design/user-505.png"
                  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                  alt="Profile"
                /> */}
                <span>{user?user.displayName:'Welcome'} </span>
                <Arrow></Arrow>
              </div>
              {showLogout && (
                <div className="dropdownContent">
                  <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
                </div>
              )}
            </div>
          ) : (
            <span><Link to={'/login'}>Login</Link> </span>
          )}
          <hr />
        </div>
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            {user ? (
              <Link to={'/create'}><span>SELL</span></Link>
            ) : (
              <Link to={'/login'}><span>SELL</span></Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
