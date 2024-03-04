import { Navbar } from "../components/Navbar";
import '../styles/Contacts.css';

const Contacts = () => {
  return (
    <div className="container">
      <Navbar/>
      <div className="content">
      <h2>Contact Us</h2>
      <p>Feel free to reach out to us via email or phone...</p>
      </div>
    </div>
  );
};

export default Contacts;
