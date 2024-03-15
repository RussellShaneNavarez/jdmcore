import { useState, useEffect } from 'react'; // Import useState hook
import { Link } from 'react-router-dom';
import '../styles/Card.css';
import emptyHeartSvg from '../assets/img/empty-heart.svg';
import fullHeartSvg from '../assets/img/full-heart.svg'; 
import speedSvg from '../assets/img/speed-meter-svgrepo-com.svg';
import powerSvg from '../assets/img/racing-speed-svgrepo-com.svg';

const redirectToDetails = (objectId) => {
  window.location.href = `/details/${objectId}`;
};

const Card = ({ car, profile, userFavorites, toggleFavorite }) => {
  const { id, brand, model, maxPower, maxSpeed,  year, imgUrl } = car;

  // State to keep track of whether the car is favorited or not
  const [favorited, setFavorited] = useState(userFavorites.includes(id));

  useEffect(() => {
    setFavorited(userFavorites.includes(id));
  }, [userFavorites, id]);

  // Function to toggle the favorite status of the car
  const handleToggleFavorite = () => {
    toggleFavorite(id); // Update the favorite status
    setFavorited(!favorited); // Toggle the favorited state
  };

  return (
    <div key={id} className="card"> 
      <img src={imgUrl} alt={`${brand} ${model}`} className="car-image" onClick={() => redirectToDetails(id)} />
      <div className="card-details">
        <div className="details">

          <div className="model-name">
            <p><strong>{brand}</strong> - {model}</p> 
          </div>

          <div className="other-info">
             <div id="box-info"><img className="icon-detail" src={speedSvg} /><p>{maxPower} CV</p></div>
             <div id="box-info"><img className="icon-detail"  src={powerSvg} /><p>{maxSpeed}Km/h</p></div>
            <p>{year}</p>
          </div>

          <div className='favorite'>
            {profile ? (
              <div className="heart-box">
                {/* Conditional rendering of the heart icon based on the favorited state */}
                <img onClick={handleToggleFavorite} className='heart-icon' src={favorited ? fullHeartSvg : emptyHeartSvg} alt="Heart Icon" />
              </div>
            ) : (
              <div className='loginregister'>
                <p>Please sign in or register to add favorites</p>
                <button>
                  <Link to="/login" className="button">Login</Link>
                </button>
                <button>
                  <Link to="/register" className="button">Register</Link>
                </button>
              </div>
            )}
          </div>
  
         
        </div>
        
      </div>
    </div>
  );
};

export default Card;