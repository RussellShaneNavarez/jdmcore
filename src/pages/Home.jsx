import '../styles/Home.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useRef, useEffect, useState } from 'react';
import backgroundVideo from '../assets/vid/jdmbg.mp4';
import nagata from '../assets/img/nagata.jpg';
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

  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  const scrollUp = useRef();
  // const scrollDown = useRef();

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
    const nissanDivs = document.querySelectorAll('.nissan-div, .overview-section');
    
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

  // For Nissan Titles
  useEffect(() => {
    const titles = document.querySelectorAll('.nissan-title');
  
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };
  
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const h2Element = entry.target.querySelector('h2');
          const pElement = entry.target.querySelector('p');
  
          h2Element.classList.add('fadeInRight');
          pElement.classList.add('fadeInLeft');
  
          observer.unobserve(entry.target);
        }
      });
    };
  
    const observer = new IntersectionObserver(callback, options);
    titles.forEach(title => observer.observe(title));
  
    return () => observer.disconnect();
  }, []);  

  // For Nagata DIV
  useEffect(() => {
    const titles = document.querySelectorAll('.nagata-title h2');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fadeIn');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    titles.forEach(title => observer.observe(title));

    return () => observer.disconnect();
  }, []);

  // For Nagata DIV
useEffect(() => {
  const nagataDivs = document.querySelectorAll('.nagata-div');

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 
  };

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const imgElement = entry.target.querySelector('.nagata-img img');
        imgElement.classList.add('fadeIn');

        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  nagataDivs.forEach(div => observer.observe(div));

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
          {displayName.trim() === '' ? (
            <h1>Welcome back!</h1>
          ) : (
            <h1>Welcome back, {displayName}!</h1>
          )}
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
          <h2>&quot;Godzilla&quot;</h2>
          <p>The most iconic sports car within the JDM Culture.</p>
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
        <section className="nagata-container">
              <div className="nagata-title">
                <h2>The Legend</h2>
                <h2>Smokey Nagata</h2>
              </div>
              <div className="nagata-div">
                <div className="nagata-img">
                 
                  <img src={nagata} alt="Smokey Nagata" />
                </div>
              <div className="nagata-content">
                <h2>Smokey Nagata</h2>
                <p>Smokey Nagata is a legendary figure in the world of automotive enthusiasts, particularly renowned for his daring exploits in high-speed driving and his iconic golden Toyota Supra. Born in Japan, Smokey Nagata became internationally famous for pushing the boundaries of speed and performance, capturing the imagination of enthusiasts worldwide.</p>
                <p>One of the most notable aspects of Smokey Nagata&apos;s legacy is his fearless approach to high-speed driving, often on public roads and highways. His audacious runs, sometimes reaching speeds well beyond legal limits, earned him notoriety and a cult following among automotive enthusiasts. Nagata&apos;s ability to push both himself and his vehicles to the limit set him apart as a true pioneer of high-performance driving.</p>
                <p>At the heart of Smokey Nagata&apos;s legend is his golden Toyota Supra, which became an iconic symbol of his audacity and technical prowess. This highly modified Supra was meticulously engineered and tuned to perfection, capable of reaching speeds exceeding 300 km/h. The golden Supra, adorned with striking visuals and powerful performance enhancements, stood as a testament to Nagata&apos;s relentless pursuit of speed and adrenaline.</p>
                <p>Despite the controversy surrounding his high-speed runs, Smokey Nagata&apos;s influence on the automotive world is undeniable. He captured the imagination of enthusiasts with his daring feats and left an indelible mark on the culture of speed and performance. Even today, his legacy continues to inspire a new generation of automotive enthusiasts who admire his fearless approach to pushing the limits of what&apos;s possible on four wheels.</p>
              </div>
            </div>
          </section>
        </div>
        {isScrollingDown && (
        <div className="scrollUpDiv">
          <button onClick={() => scrollHandler(scrollUp)} className="scrollUp">
            Scroll up
          </button>
        </div>
      )}
      <Footer />      
      </div>              
    ); 
};
