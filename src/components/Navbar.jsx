import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthContext } from '../providers/AuthProvider';

import '../styles/Navbar.css';

library.add(faBars); // Add icons to the library

export const Navbar = () => {
  const { profile, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const dropDownMenuRef = useRef(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    const toggleBtn = toggleBtnRef.current;
    const dropDownMenu = dropDownMenuRef.current;

    const handleClick = () => {
      if (dropDownMenu.classList.contains('open')) {
        dropDownMenu.classList.remove('open');
      } else {
        dropDownMenu.classList.add('open');
      }
      setButtonClicked(!buttonClicked);
    };

    if (toggleBtn) {
      toggleBtn.addEventListener('click', handleClick);

      return () => {
        toggleBtn.removeEventListener('click', handleClick);
      };
    }
  }, [buttonClicked]);

  return (
    <div className="navbar">
      <div className="sub-navbar">
        <div className="logo">
          <img src={require('../assets/img/logo.png')} alt="Logo" />
        </div>
        <ul className='links'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cars">Cars</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contacts">Contact</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/carform">CarForm</Link></li>
        </ul>
        {profile ? (
          <button className="action_btn" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login" className="action_btn">Sign In</Link>
        )}
        <div ref={toggleBtnRef} className='toggle_btn'>
          <FontAwesomeIcon icon="bars" />
        </div>
      </div>

      <div ref={dropDownMenuRef} className="dropdown_menu">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cars">Cars</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contacts">Contact</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/carform">CarForm</Link></li>
          <li>
        {profile ? (
          <button className="action_btn" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login" className="action_btn">Sign In</Link>
        )}
</li>
        </ul>
      </div>
    </div>
  );
};
