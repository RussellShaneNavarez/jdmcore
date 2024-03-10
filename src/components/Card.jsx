import { Link } from 'react-router-dom';
import '../styles/Card.css';

const redirectToDetails = (objectId) => {
  window.location.href = `/details/${objectId}`;
};

const Card = ({ car, toggleFavorite, profile, userFavorites }) => {
  const { id, brand, model, year, imgUrl } = car;

  return (
    <div key={id} className="card"> 
      <img src={imgUrl} alt={`${brand} ${model}`} className="car-image" onClick={() => redirectToDetails(id)} />
      <div className="card-details">
        <div className="details">
          <p><strong>{brand} {model}</strong> - {year}</p>
        </div>
        <div className='favorite'>
          {profile ? ( // Check if profile exists
            <button onClick={() => toggleFavorite(id)}>
              {userFavorites.includes(id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
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
  );
};

export default Card;
