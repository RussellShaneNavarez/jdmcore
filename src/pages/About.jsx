import { Navbar } from "../components/Navbar";
import { Footer } from '../components/Footer';
import '../styles/About.css';

const About = () => {
  return (
    <div className="container-about">
      <Navbar/>
      <div className="content-about">
        <div className="about-container">

          <div className="title-container">
            <p>MEET THE TEAM</p>
          </div>

          <div className="row-about">
              <div className="col-img">
                <img src={require('../assets/img/chri-img.jpg')} />
                <div className="text-box">
                  <h1>Christian Martin Mitra</h1>
                  <p> Jr. Software Engineer | 21</p>
                </div>
                
              </div>
              <div className="col-img">
                <img src={require('../assets/img/russ-img.jpg')} />
                <div className="text-box">
                  <h1>Russell Shane Navarez</h1>
                  <p>Full Stack Developer | 22</p>
                </div>
              </div>
          </div>
          

          <p></p>
        </div>
        
      </div>
      <Footer/>
    </div>
  );
};

export default About;
