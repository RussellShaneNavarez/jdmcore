import { Navbar } from "../components/Navbar";
import { Footer } from '../components/Footer';
import '../styles/About.css';

const About = () => {
  return (
    <div className="container">
      <Navbar/>
      <div className="content">
        <h2>About Us</h2>
        <p>Welcome to our website! We are a team of developers...</p>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
