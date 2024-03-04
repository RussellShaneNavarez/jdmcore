import { useState } from 'react';
import { useAuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

export const Login = () => {
  const { login, authErrorMessages } = useAuthContext();

  const [email, setEmail] = useState(''); // input field value cannot be null
  const [password, setPassword] = useState(''); // input field value cannot be null

  const [loginRunning, setLoginRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleButtonClick = async () => {
    setLoginRunning(true);
    let success = await login(email, password);
    setLoginRunning(false);
    if (success) {
      // Redirect to /home upon successful login
      window.location.href = '/';
    } else {
      setErrorMessage('Login failed!');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <label>Email:</label>
            </td>
            <td>
              <input
                type='text'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Password:</label>
            </td>
            <td>
              <input
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            {!loginRunning ? (
              <td colSpan={2} style={{ textAlign: 'center' }}>
                <button style={{ width: '75%' }} onClick={handleButtonClick}>
                  Sign In
                </button>
                {(errorMessage || authErrorMessages) && (
                  <>
                    <br />
                    <h3 style={{ color: 'red' }}>{errorMessage}</h3>
                    {authErrorMessages?.map((errorLine, idx) => (
                      <h4 key={`errmsg-${idx}`} style={{ color: 'red' }}>
                        {errorLine}
                      </h4>
                    ))}
                  </>
                )}
              </td>
            ) : (
              <td>
                <h6 style={{ color: 'green' }}>
                  <em>logging in...</em>
                </h6>
              </td>
            )}
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      <Link to="/register">
        <button>Sign Up</button>
      </Link>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
};
