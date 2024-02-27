import '../styles/Navbar.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState} from 'react';

library.add(faBars); // Add icons to the library

export const Navbar = () => {

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
      setButtonClicked(!buttonClicked); // Toggle the state
    };

    if (toggleBtn) {
      toggleBtn.addEventListener('click', handleClick);

      return () => {
        toggleBtn.removeEventListener('click', handleClick);
      };
    }
  }, [buttonClicked]); // Re-run effect when buttonClicked state changes

  

    return (
        <div className="navbar">
          <div className="sub-navbar">
            <div className="logo"><img src={require('../assets/img/logo.png')} /></div>
            <ul className='links'>
              <li><a href='#'>Home</a></li>
              <li><a href='#'>About</a></li>
              <li><a href='#'>Services</a></li>
              <li><a href='#'>Contact</a></li>
            </ul>


            {/* Fare il controllo se l'utente è loggato o meno */}
            <a href="#" className="action_btn">Login</a>

            
            <div ref={toggleBtnRef} className='toggle_btn'>
              <FontAwesomeIcon icon="bars" />
            </div>
          </div>


          <div ref={dropDownMenuRef} className="dropdown_menu">
            <li><a href='#'>Home</a></li>
            <li><a href='#'>About</a></li>
            <li><a href='#'>Services</a></li>
            <li><a href='#'>Contact</a></li>
            <li><a href="#" className="action_btn">Login</a></li>
          </div>
        </div>
    );
  };