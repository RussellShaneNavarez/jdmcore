import { Link } from 'react-router-dom';

const Card = ({ car, toggleFavorite, profile, userFavorites }) => {
  const { id, brand, model, year, description, maxPower, maxSpeed, acceleration, price, story } = car;

  return (
    <li key={id}>
      <strong>{brand} {model}</strong> - {year}<br />
      <strong>Description:</strong> {description}<br />
      <strong>Max Power:</strong> {maxPower} hp<br />
      <strong>Max Speed:</strong> {maxSpeed} km/h<br />
      <strong>Acceleration:</strong> {acceleration} sec (0-100 km/h)<br />
      <strong>Price:</strong> ${price}<br />
      <strong>Story:</strong> {story}<br />
      <strong>Favorites:</strong>
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
      <br />
    </li>
  );
};

export default Card;
