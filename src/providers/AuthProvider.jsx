import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, deleteUser, updatePassword } from 'firebase/auth';
import { doc, onSnapshot, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { useFirebaseContext } from './FirebaseProvider';

export const AuthContext = createContext({});

const PROFILE_COLLECTION = 'Users'; // name of the Firestore collection of user profile docs

const AuthProvider = (props) => {
    const children = props.children;

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const { myAuth, myFS } = useFirebaseContext();

    useEffect(() => {
        if (myAuth) {
            let unsubscribe = onAuthStateChanged(myAuth, (user) => {
                console.log('onAuthStateChanged(): got user', user);
                if (user) {
                    setUser(user);
                }

                setAuthLoading(false);
            });

            return unsubscribe;
        }
    }, [myAuth]);

    useEffect(() => {
        let unsubscribe = null;
        const listenToUserDoc = async (uid) => {
            try {
                let docRef = doc(myFS, PROFILE_COLLECTION, uid);
                unsubscribe = await onSnapshot(
                    docRef,
                    (docSnap) => {
                        let profileData = docSnap.data();
                        console.log('Got user profile:', profileData, docSnap);
                        if (!profileData) {
                            alert(`No profile doc found in Firestore at: ${docRef.path}`);
                        }
                        setProfile(profileData);
                    },
                    (firestoreErr) => {
                        console.error(
                            `onSnapshot() callback failed with: ${firestoreErr.message}`,
                            firestoreErr
                        );
                        alert(firestoreErr.message);
                    }
                );
            } catch (ex) {
                console.error(
                    `useEffect() calling onSnapshot() failed with: ${ex.message}`
                );
                alert(ex.message);
            }
        };

        if (user?.uid) {
            listenToUserDoc(user.uid);

            return () => {
                unsubscribe && unsubscribe();
            };
        } else if (!user) {
            setAuthLoading(true);
            setProfile(null);
        }
    }, [user, setProfile, myFS]);

    const register = async (email, password, displayName = '') => {
        try {
            const userCredential = await createUserWithEmailAndPassword(myAuth, email, password);
            const user = userCredential.user;

            const userDocRef = doc(myFS, 'Users', user.uid);
            const userDocData = {
                uid: user.uid,
                email: email,
                displayName: displayName,
                dateCreated: serverTimestamp(),
            };

            await setDoc(userDocRef, userDocData);
            return true;
        } catch (error) {
            alert(error.message);
            return false;
        }
    };

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(myAuth, email, password);
            const user = userCredential.user;

            setUser(user);
            return true;
        } catch (error) {
            alert(error.message);
            return false;
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            await signOut(myAuth);
            console.log('Signed Out');
            return true;
        } catch (error) {
            alert(error.message);
            return false;
        }
    };

    const forgotPassword = async (email) => {
        try {
            await sendPasswordResetEmail(myAuth, email);
            console.log('Password reset email sent');
            return true;
        } catch (error) {
            alert(error.message);
            return false;
        }
    };

    const deleteAccount = async () => {
        try {
            const currentUser = myAuth.currentUser;
            await deleteUser(currentUser);
            const userDocRef = doc(myFS, PROFILE_COLLECTION, currentUser.uid);
            await deleteDoc(userDocRef);
            setUser(null);
            console.log('Account deleted successfully');
            return true;
        } catch (error) {
            alert(error.message);
            return false;
        }
    };

    const handleChangePassword = async (currentPassword, newPassword) => {
        await updatePassword(myAuth.currentUser, newPassword);
        console.log("Password updated successfully");
        alert("Password updated successfully");
    };
    

    if (authLoading) {
        return <h1>Loading</h1>;
    }

    const theValues = {
        profile,
        user,
        login,
        logout,
        register,
        forgotPassword,
        deleteAccount,
        handleChangePassword
    };

    return (
        <AuthContext.Provider value={theValues}>{children}</AuthContext.Provider>
    );
};

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuthContext was used outside of its Provider');
    }

    return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuthContext };
