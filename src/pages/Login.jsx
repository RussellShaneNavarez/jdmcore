import { useState } from 'react';
import { useAuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import backgroundVideo from '../assets/vid/jdmbg.mp4';

export const Login = () => {
  const { login, authErrorMessages } = useAuthContext();

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  const [loginRunning, setLoginRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleButtonClick = async () => {
    setLoginRunning(true);
    let success = await login(email, password);
    setLoginRunning(false);
    if (success) {
      window.location.href = '/';
    } else {
      setErrorMessage('Login failed!');
    }
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleButtonClick();
    }
  };

  return (
    <div className="login-container">
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="dim-overlay"></div>
      <div className="login-form">
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
                  onKeyDown={handleEnterKeyPress}
                />
              </td>
            </tr>
            <tr>
              {!loginRunning ? (
                <td colSpan={2} style={{ textAlign: 'center' }}>
                  <button className="login-button" onClick={handleButtonClick}>
                    Sign In
                  </button>
                  {(errorMessage || authErrorMessages) && (
                    <>
                      <br />
                      <h3 className="error-message">{errorMessage}</h3>
                      {authErrorMessages?.map((errorLine, idx) => (
                        <h4 key={`errmsg-${idx}`} className="error-message">
                          {errorLine}
                        </h4>
                      ))}
                    </>
                  )}
                </td>
              ) : (
                <td>
                  <h6 className="success-message">
                    <em>Logging in...</em>
                  </h6>
                </td>
              )}
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <div className="goregister">
        <span>Don{`'`}t have an account?</span>
          <Link to="/register">
          <p style={{textDecoration:'underline'}}>Sign Up</p>
          </Link>
          </div>
          <div className='gohome'>
          <Link to="/">
          <span style={{textDecoration:'underline'}}>Skip for now {`>>>`}</span>
          </Link>
          </div>
      </div>
    </div>
  );
  
};
