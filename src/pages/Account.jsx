import { useState, useEffect} from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from '../components/Footer';
import '../styles/Account.css';
import { useAuthContext } from '../providers/AuthProvider';
import { useFirebaseContext } from "../providers/FirebaseProvider";
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

const Account = () => {
    const { profile, logout, deleteAccount, handleChangePassword } = useAuthContext();
    const { myFS } = useFirebaseContext();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState('');
    const [updateConfirmation, setUpdateConfirmation] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showPasswordFields, setShowPasswordFields] = useState(false); 

    useEffect(() => {
      const fetchDisplayName = async () => {
        if (profile) {
          const usersRef = collection(myFS, 'Users');
          const q = query(usersRef, where('uid', '==', profile.uid));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setDisplayName(doc.data().displayName);
          });
        }
      };
  
      fetchDisplayName();
    }, [profile, myFS]);

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

    const toggleEditMode = () => {
      setEditMode(!editMode);
    };

    const handleDisplayNameChange = (event) => {
      setNewDisplayName(event.target.value);
    };

    const handleUpdateDisplayName = async () => {
      setUpdateConfirmation(true);
    };

    const confirmUpdateDisplayName = async () => {
      try {
        const userRef = doc(myFS, 'Users', profile.uid);
        await updateDoc(userRef, { displayName: newDisplayName });
        setDisplayName(newDisplayName);
        setEditMode(false);
        setUpdateConfirmation(false); 
      } catch (error) {
        console.error('Error updating display name:', error.message);
      }
    };

    const cancelUpdateDisplayName = () => {
      setUpdateConfirmation(false); 
    };

    const passwordsMatch = () => {
      return newPassword === confirmNewPassword;
    };
    

    const handlePasswordChange = async () => {
      try {
        if (currentPassword === '') {
          alert('Please enter your current password.');
          return;
        }
        if (newPassword === '' || confirmNewPassword === '') {
          alert('Please enter both new password and confirm new password.');
          return;
        }
        if (!passwordsMatch()) {
          alert('New password and confirm new password do not match.');
          return;
        }
    
        await handleChangePassword(currentPassword, newPassword);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        console.log('Password changed successfully');
      } catch (error) {
        alert(error.message);
      }
    };
    

    return (
      <div className="account-container">
        <Navbar/>
        <div className="account-content">
          <h1>ACCOUNT</h1>
          <div className="account-profile">
            {profile ? (
              <>
                <div className="credentials">
                  <label>Display Name:</label> 
                  {editMode ? 
                    <input 
                      type="text" 
                      value={newDisplayName} 
                      onChange={handleDisplayNameChange} 
                      placeholder="Enter new display name" 
                    /> 
                    : <input 
                      type="text" 
                      value={displayName} 
                      placeholder="Display Name" 
                      disabled 
                    />
                  }
                </div>
                <div className="credentials">
                  <label>Email:</label> 
                  {editMode ? (
                    <input 
                      type="text" 
                      placeholder={profile.email}
                      disabled 
                    />
                  ) : (
                    <input
                      type="text"
                      value={profile.email}
                      placeholder="Email"
                      disabled
                    />
                  )}
                </div>

                {editMode && (
                  <div className="credentials">
                    <label>Change Password:</label>
                    <button onClick={() => setShowPasswordFields(!showPasswordFields)}>
                      {showPasswordFields ? "Hide" : "Show"}
                    </button>
                  </div>
                )}
                {showPasswordFields && editMode && ( 
                  <>
                    <div className="credentials">
                      <label>Current Password:</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Current Password"
                      />
                    </div>

                    <div className="credentials">
                      <label>New Password:</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                      />
                    </div>

                    <div className="credentials">
                      <label>Confirm New Password:</label>
                      <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="Confirm New Password"
                      />
                    </div>
                  </>
                )}
                <div className="profile-btn">

                  <div className="edit-change">
                  <button onClick={toggleEditMode}>
                    {editMode ? 'Cancel' : 'Edit Display Name'}
                  </button>
                  {editMode && 
                  <button onClick={handleUpdateDisplayName}>Save Display Name</button>}
                  {showPasswordFields && (
                    <button onClick={handlePasswordChange}>Change Password</button>
                  )}
                  </div>

                  <div className="delete-logout">
                  <p className="delete-account" onClick={toggleDeleteConfirmation}>Delete Account</p>
                  <button onClick={handleLogout}>Logout</button>
                  </div>

                </div>
              </>
            ) : (
              
              <div className="profile-p">
              <p>Register or log in</p>
              </div>
            )}
          </div>

          {deleteConfirmation && (
            <div className="confirmation-overlay">
              <div className="confirmation-box">
                <p>Are you sure you want to delete your account?</p>
                <div className="confirmation-btn">
                  <button onClick={handleDeleteAccount}>Yes, delete</button>
                  <button onClick={toggleDeleteConfirmation}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          {updateConfirmation && (
            <div className="confirmation-overlay">
              <div className="confirmation-box">
                <p>Are you sure you want to update your display name?</p>
                <div className="confirmation-btn">
                  <button onClick={confirmUpdateDisplayName}>Yes, update</button>
                  <button onClick={cancelUpdateDisplayName}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          <div className="version">
            <p>Version 1.0</p>
          </div>
        </div>
        <Footer/>
      </div>
    );
};

export default Account;
