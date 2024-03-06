import '../styles/Home.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useRef } from 'react';
import backgroundVideo from '../assets/vid/jdmbg.mp4';

export const Home = () => {

  // variable scrollUp with useRef()
  const scrollUp = useRef();

  // function scrollHandler
  const scrollHandler = (elmRef) => {
    console.log(elmRef.current);
    window.scrollTo({ top: elmRef.current.offsetTop, behavior: "smooth" });
  };

    return (
      <div>
        <div className="body" ref={scrollUp}>
        <div className="video-container">
          <div className="overlay"></div> 
             <video autoPlay loop muted className="background-video">
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
          <div className="overlay-text">
            <h1>Welcome to JDM Core</h1>
            <p>Discover the thrill of JDM culture</p>
           </div>
          <header>
            <Navbar />
          </header>
        </div>
        </div>
        <div className="main">
          <div className="sub-main">
            <h2>Car of the month</h2>
            <hr />
            <img src={require('../assets/img/car-model.png')} />
            <h3>Nissan Skyline GTR R34</h3>
            <p> (Non fare caso a questo, fa troppo ridere hahaha)</p>
          </div>


        </div>
        {/* button scroll up */}
        <div className="scrollUpDiv">
          {/*  scrollHandler(nameOfvariable) */}
            <button onClick={() => scrollHandler(scrollUp)} className="scrollUp">
             Scroll up
            </button>
        </div>
      <Footer />      
      </div>
           
      
    );
  
};
