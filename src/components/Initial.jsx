import { Link } from 'react-router-dom';

const Initial = () => {
  return (
    <div>
      <h1>Welcome to Our Website</h1>
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Initial;
