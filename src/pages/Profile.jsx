import { Navbar } from "../components/Navbar";
import '../styles/Profile.css';

const Profile = () => {
    return (
      <div className="container">
        <Navbar/>
        <div className="content">
        <h2>Profile</h2>
        <p>Privacy Bro</p>
        </div>
      </div>
    );
  };
  
  export default Profile;
  