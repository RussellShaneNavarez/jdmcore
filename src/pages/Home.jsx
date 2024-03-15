import '../styles/Home.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useRef, useEffect, useState } from 'react';
import backgroundVideo from '../assets/vid/jdmbg.mp4';
import r32 from '../assets/img/r32.jpg'
import r33 from '../assets/img/r33.jpg'
import r34 from '../assets/img/r34.jpg'
import r35 from '../assets/img/r35.jpg'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../providers/AuthProvider';
import { useFirebaseContext } from '../providers/FirebaseProvider';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const Home = () => {

  const { myFS } = useFirebaseContext();
  const [displayName, setDisplayName] = useState('');
  const { profile } = useAuthContext();

  const scrollUp = useRef();
  // const scrollDown = useRef();

  const scrollHandler = (elmRef) => {
    console.log(elmRef.current);
    window.scrollTo({ top: elmRef.current.offsetTop, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchDisplayName = async () => {
      if (profile) {
        const usersRef = collection(myFS, 'Users');
        const q = query(usersRef, where('uid', '==', profile.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setDisplayName(doc.data().displayName);
        });
      }
    };

    fetchDisplayName();
  }, [profile, myFS]);

  // For Nissan DIV
  useEffect(() => {
    const nissanDivs = document.querySelectorAll('.nissan-div');
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 
    };
  
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Determine animation based on entry index
          const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
          const animationName = index % 2 === 0 ? 'fadeInFromLeft' : 'fadeInFromRight';
          
          entry.target.style.animation = `${animationName} 1s ease forwards`;
          observer.unobserve(entry.target);
        }
      });
    };
  
    const observer = new IntersectionObserver(callback, options);
    nissanDivs.forEach(div => observer.observe(div));
  
    return () => observer.disconnect();
  }, []);

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
          {profile ? (
          <div className='overlay-home'>
            <h1>Welcome back, {displayName}!</h1>
            <p>Great to see you here again!</p>
          </div>
        ) : (
          <div className='overlay-home'>
            <h1>Welcome to JDM Core</h1>
            <p>Discover the thrill of JDM culture</p>
          </div>
        )}
           </div>
          <header>
            <Navbar />
          </header>
        </div>
        </div>
        <div className="main">{/*ref={scrollDown */}
        <section className="overview-section" >
         <div className="overview-container">
          <h2>Overview</h2>
            <p>
              Our website is a curated collection of Japanese Domestic Market (JDM)
              cars, showcasing the finest automobiles straight from Japan. As
              enthusiasts of JDM culture, we{`'`}ve assembled a diverse array of iconic
              vehicles that embody the spirit of Japanese engineering excellence,
              performance, and style.
            </p>
            <button><Link to="/cars" className="explore-btn">Explore</Link></button>
          </div>
        </section>
        <section className="nissan-container">
          <div className='nissan-title'>
          <h2>Nissan GT-R Series</h2>
          </div>
          
          {/* First div */}
          <div className="nissan-div">
            <div className="nissan-img">
            <img src={r32} alt="Nissan GT-R" />
            </div>
            <div className="content">
              <h2>Nissan GT-R Series</h2>
              <p>Information about Nissan R32</p>
              <button>Learn More</button>
            </div>
          </div>
          {/* Second div */}
          <div className="nissan-div">
            <div className="content">
              <h2>Nissan GT-R Series</h2>
              <p>Information about Nissan R33</p>
              <button>Learn More</button>
            </div>
            <div className="nissan-img">
            <img src={r33} alt="Nissan GT-R" />
            </div>
          </div>
          {/* Third div */}
          <div className="nissan-div">
          <div className="nissan-img">
            <img src={r34} alt="Nissan GT-R" />
            </div>
            <div className="content">
              <h2>Nissan GT-R Series</h2>
              <p>Information about Nissan R34</p>
              <button>Learn More</button>
            </div>
          </div>
          {/* Fourth div */}
          <div className="nissan-div">
            <div className="content">
              <h2>Nissan GT-R Series</h2>
              <p>Information about Nissan R35</p>
              <button>Learn More</button>
            </div>
            <div className="nissan-img">
            <img src={r35} alt="Nissan GT-R" />
            </div>
          </div>
        </section>
        </div>
        <div className="scrollUpDiv">
            <button onClick={() => scrollHandler(scrollUp)} className="scrollUp">
             Scroll up
            </button>
        </div>
      <Footer />      
      </div>              
    ); 
};
