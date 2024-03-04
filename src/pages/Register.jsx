import { useState } from 'react';
import { useAuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import '../styles/Register.css';
import backgroundVideo from '../assets/vid/jdmbg.mp4';

export const Register = () => {
  const { register, authErrorMessages } = useAuthContext();

  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

  const [registrationRunning, setRegistrationRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleButtonClick = async () => {
    setRegistrationRunning(true);

    let theUsername = username;
    if (theUsername?.length <= 0) {
      theUsername = ' ';
    }

    let success = await register(email, password, theUsername);
    setRegistrationRunning(false);
    if (success) {
      window.location.href = '/';
    } else {
      setErrorMessage('Registration failed!');
    }
  };

  return (
    <div className="register-container">
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="dim-overlay"></div>
      <div className="register-form">
      <h2>Sign Up</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <label>Username:</label>
            </td>
            <td>
              <input
                type='text'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </td>
          </tr>
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
            {!registrationRunning ? (
              <td colSpan={2} style={{ textAlign: 'center' }}>
                <button style={{ width: '75%' }} onClick={handleButtonClick}>
                  Sign Up
                </button>
                {errorMessage && (
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
                  <em>registering...</em>
                </h6>
              </td>
            )}
          </tr>
        </tbody>
      </table>
        <div className='gologin'>
        <span>Already have an account?</span>
        <Link to="/login">
        <p style={{textDecoration:'underline'}}>Sign In</p>
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
