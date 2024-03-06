import { Link } from 'react-router-dom';
import '../styles/Card.css';

const redirectToDetails = (objectId) => {
  window.location.href = `/details/${objectId}`;
};

const Card = ({ car, toggleFavorite, profile, userFavorites }) => {
  const { id, brand, model, year, description, maxPower, maxSpeed, acceleration, price, story, imgUrl } = car;

  return (
    <div key={id} className="card"> 
      <img src={imgUrl} alt={`${brand} ${model}`} className="car-image" onClick={() => redirectToDetails(id)} />
      <div className="card-details">
        <div className="details">
        <p><strong>{brand} {model}</strong> - {year}</p>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Max Power:</strong> {maxPower} hp</p>
        <p><strong>Max Speed:</strong> {maxSpeed} km/h</p>
        <p><strong>Acceleration:</strong> {acceleration} sec (0-100 km/h)</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Story:</strong> {story}</p>
        </div>
        <div className='favorite'>
        {profile && ( 
          <button onClick={() => toggleFavorite(id)}>
            {userFavorites.includes(id) ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        )}
        {!profile && ( 
          <div>
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
  );
};

export default Card;
