import { Navbar } from "../components/Navbar";
import { Footer } from '../components/Footer';
import '../styles/Account.css';
import { useAuthContext } from '../providers/AuthProvider';
import { useState } from "react";

const Account = () => {
    const { profile, logout, deleteAccount } = useAuthContext();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const handleLogout = async () => {
      try {
        await logout();
        window.location.href = '/login';
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    const handleDeleteAccount = async () => {
      try {
        const success = await deleteAccount();
        if (success) {
          window.location.href = '/login';
        } else {
          console.error('Failed to delete account');
        }
      } catch (error) {
        console.error('Error deleting account:', error.message);
      }
    };
    

    const toggleDeleteConfirmation = () => {
      setDeleteConfirmation(!deleteConfirmation);
    };


    return (
      <div className="container">
        <Navbar/>
        <div className="account-content">
        <h1>ACCOUNT</h1>
        <div className="account-profile">
        {profile ? (
        <>
          <p>Email: {profile.email}</p>
          <div className="profile-btn">
          <button onClick={handleLogout}>Logout</button>
          <button onClick={toggleDeleteConfirmation}>Delete Account</button>
          </div>
        </>
      ) : (
        <p>Register or log in</p>
      )}
      {deleteConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <p>Are you sure you want to delete your account?</p>
            <div className="confirmation-bnt">
            <button onClick={handleDeleteAccount}>Yes, delete</button>
            <button onClick={toggleDeleteConfirmation}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      </div>
        </div>
        <Footer/>
      </div>
    );
  };
  
  export default Account;
  