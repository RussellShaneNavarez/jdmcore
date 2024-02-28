import { createContext, useContext, useEffect, useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const FirebaseContext = createContext({});

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};
const myApp = initializeApp(firebaseConfig);
const myAuth = getAuth(myApp);
const myFS = getFirestore(myApp);
const myStorage = getStorage(myApp);

const FirebaseProvider = (props) => {
  const { children } = props;

  const [firebaseInitializing, setFirebaseInitializing] = useState(true);

  useEffect(() => {
    setFirebaseInitializing(false);
  }, []);

  if (firebaseInitializing) {
    return <h1>Loading</h1>;
  }

  const theValues = {
    myApp,
    myAuth,
    myFS,
    myStorage,
  };

  return (
    <FirebaseContext.Provider value={theValues}>
      {children}
    </FirebaseContext.Provider>
  );
};

const useFirebaseContext = () => {
  // get the context
  const context = useContext(FirebaseContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useFirebaseContext was used outside of its Provider');
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { FirebaseProvider, useFirebaseContext };
