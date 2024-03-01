import { useEffect, useState } from 'react';
import { useFirebaseContext } from '../providers/FirebaseProvider';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { useAuthContext } from '../providers/AuthProvider';
import Card from '../components/Card'; 
import { Navbar } from '../components/Navbar';
import '../styles/Cars.css';

const Cars = () => {
  const { myFS } = useFirebaseContext();
  const { profile } = useAuthContext(); 
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [userFavorites, setUserFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedBrand, setSelectedBrand] = useState(''); 
  const [selectedModel, setSelectedModel] = useState(''); 

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
          const userId = profile.uid; // Prende il campo uid dello User
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

  
  // Object click
  const handleObjectClick = async (objectId) => {
    try {
      // Fetch object data from Firestore
      const objectRef = doc(collection(myFS, 'Cars'), objectId);
      const objectSnapshot = await getDoc(objectRef);

      if (objectSnapshot.exists) {
        // Navigate to SelectedObjectPage with object data
        window.location.href = `/details/${objectId}`; // Use window.location.href to navigate
      } else {
        console.log('Object does not exist');
      }
    } catch (error) {
      console.error('Error fetching object:', error);
    }
  };

  // Filter cars based on the search term, selected brand, and selected model
  useEffect(() => {
    let filtered = cars;
  
    // Function to check if a car matches the search term
    const carMatchesSearch = (car, searchTerm) => {
      const searchWords = searchTerm.toLowerCase().split(/\s+/); // Split search term by spaces
      return searchWords.every(word =>
        car.brand.toLowerCase().includes(word) || car.model.toLowerCase().includes(word)
      );
    };
  
    if (selectedBrand) {
      filtered = filtered.filter(car => car.brand === selectedBrand);
    }
    if (selectedModel) {
      filtered = filtered.filter(car => car.model === selectedModel);
    }
    if (searchTerm) {
      filtered = filtered.filter(car => carMatchesSearch(car, searchTerm));
    }
    setFilteredCars(filtered);
  }, [cars, searchTerm, selectedBrand, selectedModel]);

  const toggleFavorite = async (id) => {
    try {
      if (!profile) { 
        return;
      }

      const userId = profile.uid; 
      const userDocRef = doc(collection(myFS, 'Users'), userId);

      const userDocSnapshot = await getDoc(userDocRef);
      const currentFavorites = userDocSnapshot.data().favorites || [];

      if (currentFavorites.includes(id)) {
        await updateDoc(userDocRef, {
          favorites: currentFavorites.filter(favId => favId !== id)
        });
      } else {
        await updateDoc(userDocRef, {
          favorites: [...currentFavorites, id]
        });
      }

      setUserFavorites(prevFavorites => {
        if (prevFavorites.includes(id)) {
          return prevFavorites.filter(favId => favId !== id);
        } else {
          return [...prevFavorites, id];
        }
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // Get unique brands and models for dropdown options
  const brands = [...new Set(cars.map(car => car.brand))];
  const models = [...new Set(cars.map(car => car.model))];

  return (
    <div className="cars-container"> 
      <Navbar /> 
      <div className="cars-content"> 
        <h2>Cars</h2>
        <div>
          <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
            <option value="">All Brands</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
          <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
            <option value="">All Models</option>
            {models.map((model, index) => (
              <option key={index} value={model}>{model}</option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Search by brand or model"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="card-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredCars.length === 0 ? (
              <p>No cars were found.</p>
            ) : (
              filteredCars.map(car => (
              <div key={car.id}  onClick={() => handleObjectClick(car.id)}>
                <Card
                  car={car}
                  toggleFavorite={toggleFavorite}
                  profile={profile}
                  userFavorites={userFavorites}
                />
              </div>
            
              ))
            )
        )}
      </div>
      </div>
    </div>
  );
};

export default Cars;
