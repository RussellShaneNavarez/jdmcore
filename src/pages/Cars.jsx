import { useEffect, useState } from 'react';
import { useFirebaseContext } from '../providers/FirebaseProvider';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../providers/AuthProvider';

const Cars = () => {
  const { myFS } = useFirebaseContext();
  const { profile } = useAuthContext(); 
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsCollectionRef = collection(myFS, 'Cars');
        const carsSnapshot = await getDocs(carsCollectionRef);
        const fetchedCars = carsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCars(fetchedCars);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };

    const fetchUserFavorites = async () => {
      try {
        if (profile) { 
          const userId = profile.uid; // Prendi uid dalla raccolta 'Users' per il profilo loggato
          const userFavoritesDocRef = doc(collection(myFS, 'Users'), userId);
          const userFavoritesDocSnapshot = await getDoc(userFavoritesDocRef);
    
          if (userFavoritesDocSnapshot.exists()) {
            setUserFavorites(userFavoritesDocSnapshot.data().favorites || []);
          } else {
            setUserFavorites([]);
          }
        }
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      }
    };
    

    fetchCars();
    fetchUserFavorites();
  }, [myFS, profile]);

  const toggleFavorite = async (id) => {
    try {
      if (!profile) {
        return;
      }
  
      const userId = profile.uid;
      const userDocRef = doc(collection(myFS, 'Users'), userId);
  
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();
      const currentFavorites = userData.favorites || [];
  
      const isFavorite = currentFavorites.includes(id);
  
      let updatedFavorites; // Definisci la variabile updatedFavorites
  
      if (isFavorite) {
        updatedFavorites = currentFavorites.filter(favId => favId !== id);
        await updateDoc(userDocRef, { favorites: updatedFavorites });
      } else {
        updatedFavorites = [...currentFavorites, id];
        await updateDoc(userDocRef, { favorites: updatedFavorites });
      }
  
      setUserFavorites(updatedFavorites);
    } catch (error) {
      console.error('Errore durante la gestione dei preferiti:', error);
    }
  };
  
  

  return (
    <div>
      <h2>Cars</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cars.map(car => (
            <li key={car.id}>
              <strong>{car.brand} {car.model}</strong> - {car.year}<br />
              <strong>Description:</strong> {car.description}<br />
              <strong>Max Power:</strong> {car.maxPower} hp<br />
              <strong>Max Speed:</strong> {car.maxSpeed} km/h<br />
              <strong>Acceleration:</strong> {car.acceleration} sec (0-100 km/h)<br />
              <strong>Price:</strong> ${car.price}<br />
              <strong>Story:</strong> {car.story}<br />
              <strong>Favorites:</strong>
              {profile && ( // Check if user profile exists 
                <button onClick={() => toggleFavorite(car.id)}>
                  {userFavorites.includes(car.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              )}
              {!profile && ( // Check if user profile does not exist
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
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cars;
