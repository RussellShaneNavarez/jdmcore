import { useEffect, useState, useMemo } from 'react';
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

  // Effettua la lettura iniziale delle auto e dei preferiti dell'utente
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const carsCollectionRef = collection(myFS, 'Cars');
        const carsSnapshot = await getDocs(carsCollectionRef);
        const fetchedCars = carsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCars(fetchedCars);
        setLoading(false);

        if (profile) {
          const userId = profile.uid;
          const userFavoritesDocRef = doc(collection(myFS, 'Users'), userId);
          const userFavoritesDocSnapshot = await getDoc(userFavoritesDocRef);

          if (userFavoritesDocSnapshot.exists()) {
            setUserFavorites(userFavoritesDocSnapshot.data().favorites || []);
          } else {
            setUserFavorites([]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [myFS, profile]);

  // Filtra le auto in base al termine di ricerca, brand e modello selezionati
  useEffect(() => {
    const filtered = cars.filter(car => {
      const brandMatches = !selectedBrand || car.brand === selectedBrand;
      const modelMatches = !selectedModel || car.model === selectedModel;
      const searchTermMatches = !searchTerm ||
        searchTerm
          .toLowerCase()
          .split(/\s+/) // Dividi la stringa di ricerca in parole
          .every(word =>
            car.brand.toLowerCase().includes(word) ||
            car.model.toLowerCase().includes(word)
          );
      return brandMatches && modelMatches && searchTermMatches;
    });
    setFilteredCars(filtered);
  }, [cars, searchTerm, selectedBrand, selectedModel]);

  // Ottiene i brand e i modelli unici per le opzioni del menu a tendina
  const brands = useMemo(() => [...new Set(cars.map(car => car.brand))], [cars]);
  const models = useMemo(() => [...new Set(cars.map(car => car.model))], [cars]);

  // Toggle favorite function
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
                <div key={car.id}>
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
