import '../styles/Home.css';
import { Navbar } from '../components/Navbar';
import { useRef } from 'react';

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
          <header>
            <Navbar></Navbar>
            {/* <div >your email: {profile.email}</div> */}
          </header>
          <section id="hero">
              {/* <h1> Hello, {profile.displayName} </h1> */}
              {/* <h1>  Hello, {profile.displayName} </h1> */}
              {/* <button onClick={logout}>Logout</button> */}
          </section>
        </div>

        <div className="main">
          <div className="sub-main">
            <h2>Car of the month</h2>
            <hr />
            <img src={require('../assets/img/monthcar.png')} />
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

      </div>
      
      
    );
  
};
