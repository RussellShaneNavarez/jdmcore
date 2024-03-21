import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFirebaseContext } from '../providers/FirebaseProvider';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import '../styles/Details.css';

const Details = ({ profile, userFavorites, setUserFavorites }) => {
    const { objectId } = useParams();
    const { myFS } = useFirebaseContext();
    const [car, setCar] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const detailsCarRef = doc(collection(myFS, 'Cars'), objectId);
                const carSnapshot = await getDoc(detailsCarRef);
                if (carSnapshot.exists()) {
                    setCar(carSnapshot.data());
                } else {
                    console.log('Car does not exist');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching car:', error);
                setLoading(false);
            }
        };

        fetchCar();
    }, [myFS, objectId]);

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
                setUserFavorites(prevFavorites => prevFavorites.filter(favId => favId !== id));
            } else {
                await updateDoc(userDocRef, {
                    favorites: [...currentFavorites, id]
                });
                setUserFavorites(prevFavorites => [...prevFavorites, id]);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    return (
      <div className="container">
        <Navbar/>
        <div className="content">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="detail-container">
                    <h1>{car.brand} {car.model}</h1>
                    <img src={car.imgUrl} alt={`${car.brand} ${car.model}`} />
                    <p>Year: {car.year}</p>
                    <p>Description: {car.description}</p>
                    <p>Max Power: {car.maxPower} hp</p>
                    <p>Max Speed: {car.maxSpeed} km/h</p>
                    <p>Acceleration: {car.acceleration} sec (0-100 km/h)</p>
                    <p>Price: ${car.price}</p>
                    <p>Story: {car.story}</p>
                    {profile && (
                        <button onClick={() => toggleFavorite(objectId)}>
                            {userFavorites.includes(objectId) ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    )}
                    {!profile && (
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
                </div>
            )}
        </div>
        <Footer/>
        </div>
    );
};

export default Details;
