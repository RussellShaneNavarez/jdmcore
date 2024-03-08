import { Navbar } from "../components/Navbar";
import { Footer } from '../components/Footer';
import '../styles/Contacts.css';
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';


const Contacts = () => {

  const form = useRef();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');


  const emailValidation = () => {
    const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(regEx.test(userEmail)) {
      setMessage('Email is valid');
    } else if(!regEx.test(userEmail) && userEmail != '') {
      setMessage('Email is not valid');
    } else {
      setMessage('')
    }
  }

  const sendEmail = (e) => {
    e.preventDefault();
    emailValidation();
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
  };


  return (
    <div className="container">
      <Navbar/>
      <div className="content">
      <h2>Contact Us</h2>
      <div className="container-form">
        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <p>Name: <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" name="user_name" required/> </p>
          <p>Email: <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type="email" name="user_email" required/></p>
          <p>Message: <textarea name="message" required/></p>
          <p className="message">{message}</p>
          <input type="submit" value="Send" />
        </form>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Contacts;
