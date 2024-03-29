import { useEffect, useState, useMemo, useRef } from 'react';
import { useFirebaseContext } from '../providers/FirebaseProvider';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { useAuthContext } from '../providers/AuthProvider';
import Card from '../components/Card';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
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
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  const scrollUp = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingDown(currentScrollY > prevScrollY);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  const scrollHandler = (elmRef) => {
    console.log(elmRef.current);
    window.scrollTo({ top: elmRef.current.offsetTop, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

    if (showFavoritesOnly) {
      const favoritesFiltered = filtered.filter(car => userFavorites.includes(car.id));
      setFilteredCars(favoritesFiltered);
    } else {
      setFilteredCars(filtered);
    }
  }, [cars, searchTerm, selectedBrand, selectedModel, userFavorites, showFavoritesOnly]);

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
  
      let updatedFavorites;
      if (currentFavorites.includes(id)) {
        updatedFavorites = currentFavorites.filter(favId => favId !== id);
      } else {
        updatedFavorites = [...currentFavorites, id];
      }
  
      // Update the user document in Firestore
      await updateDoc(userDocRef, { favorites: updatedFavorites });
  
      // Update the local state
      setUserFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="cars-container" ref={scrollUp}>
      <Navbar />
      <div className="cars-content">

        <div className="title-container">
          <p id="sub-title"> DISCOVER THE JDM CARS</p>
          <p id="main-title"> GALLERY CAR</p>
        </div>

        <div className="select-container">
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
          <input
            className='search-input'
            type="text"
            placeholder="Search by brand or model"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
            <button onClick={() => setShowFavoritesOnly(!showFavoritesOnly)} className='favorites-only'>
            {showFavoritesOnly ? 'Show All' : 'Show Favorites'}
          </button>
        </div>
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
      {isScrollingDown && (
        <div className="scrollUpDiv">
          <button onClick={() => scrollHandler(scrollUp)} className="scrollUp">
            Scroll up
          </button>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Cars;
