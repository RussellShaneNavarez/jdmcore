import { Navbar } from "../components/Navbar";
import { Footer } from '../components/Footer';
import '../styles/About.css';
import { useEffect, useRef, useState } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <div className="container-about" ref={scrollUp}>
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
                  <div className="about-icons">
                  <a href="https://github.com/chrimitra"><img src={require('../assets/img/github-logo.png')}></img></a>
                  <a href="https://www.linkedin.com/in/christianmartinmitra/"><img src={require('../assets/img/linkedin-icon.png')}></img></a>
                  <a href="https://www.instagram.com/chrimitra/"><img src={require('../assets/img/instagram-logo.png')}></img></a>
                  <a href="mailto:christianmitra7@gmail.com"><img src={require('../assets/img/gmail-logo.png')}></img></a>
                  </div>
                </div>
                
              </div>
              <div className="col-img">
                <img src={require('../assets/img/russ-img.jpg')} />
                <div className="text-box">
                  <h1>Russell Shane Navarez</h1>
                  <p>Full Stack Developer | 22</p>
                  <div className="about-icons">
                  <a href="https://github.com/RussellShaneNavarez"><img src={require('../assets/img/github-logo.png')}></img></a>
                  <a href="https://www.linkedin.com/in/russell-shane-navarez/"><img src={require('../assets/img/linkedin-icon.png')}></img></a>
                  <a href="https://www.instagram.com/russnvrz/"><img src={require('../assets/img/instagram-logo.png')}></img></a>
                  <a href="mailto:russellnavarez18@gmail.com"><img src={require('../assets/img/gmail-logo.png')}></img></a>
                  </div>
                </div>
              </div>
          </div>
          

          <p></p>
        </div>
        
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

export default About;
