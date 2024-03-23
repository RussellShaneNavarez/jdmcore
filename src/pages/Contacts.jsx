import { Navbar } from "../components/Navbar";
import { Footer } from '../components/Footer';
import '../styles/Contacts.css';
import emailjs from '@emailjs/browser';
import { useRef, useState, useEffect  } from 'react';

const Contacts = () => {
  const form = useRef();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');

  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  const scrollUp = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingDown(currentScrollY > prevScrollY);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  const scrollHandler = (elmRef) => {
    console.log(elmRef.current);
    window.scrollTo({ top: elmRef.current.offsetTop, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check regex email
  const emailValidation = () => {
    const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(regEx.test(userEmail)) {
      setMessage('Message sent successfully!')
      return true;
    } else if(!regEx.test(userEmail) && userEmail != '') {
      setMessage('Please enter a correct email.');
      return false;
    } else {
      setMessage('')
    }
  }

  // Send form
  const sendEmail = (e) => {
    e.preventDefault();
    if(emailValidation()) {
      emailjs.sendForm('service_5aouvrr', 'template_r1722j7', form.current, {
        publicKey: 'K1BA2H9xojXnwq0j4',
      })
      .then(
        () => {
          setUserName('');
          setUserEmail('');
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
    } else {
      console.log("Not sent");
    }
 
    
  };


  return (
    <div className="container-contacts" ref={scrollUp}>
      <Navbar/>
      <div className="content-contacts">
        <div className="container-text">
          <p id="head-text">SEND US A MESSAGE!</p>
          <p id="sub-text">Got a question or proposal, or just want<br></br>
          to say hello? Go ahead. </p>
        </div>
        <div className="message-box">
            <p className="message">{message}</p>
        </div>

        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <div className="item-input">
             <label>Your Name </label>
             <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" name="user_name" placeholder="Enter your name" required/>
          </div>
          <div className="item-input">
             <label>Email Address </label>
             <input  value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type="email" name="user_email" placeholder="Enter your email"required/>
          </div>
          <div className="item-input-message">
            <label>Your Message </label>
            <textarea  placeholder="Enter your message" name="message" required/>
          </div>
 
 
          <button className="btn-submit" type="submit" value="Send">Send</button>
        </form>

      </div>
      {isScrollingDown && (
        <div className="scrollUpDiv">
          <button onClick={() => scrollHandler(scrollUp)} className="scrollUp">
            Scroll up
          </button>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Contacts;
