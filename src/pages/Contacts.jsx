import { Navbar } from "../components/Navbar";
import { Footer } from '../components/Footer';
import '../styles/Contacts.css';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';


const Contacts = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_5aouvrr', 'template_r1722j7', form.current, {
        publicKey: 'K1BA2H9xojXnwq0j4',
      })
      .then(
        () => {
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
          <p>Name: <input type="text" name="user_name" /> </p>
          <p>Email: <input type="email" name="user_email" /></p>
          <p>Message: <textarea name="message" /></p>
          <input type="submit" value="Send" />
        </form>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Contacts;
