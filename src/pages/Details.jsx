import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection,  doc, getDoc } from 'firebase/firestore';
import { useFirebaseContext } from '../providers/FirebaseProvider';

const Details = () => {
    const { objectId } = useParams();
    const { myFS } = useFirebaseContext();
    const [car, setCar] = useState([]);
    const [loading, setLoading] = useState(true);

    // refetch of a single car
    useEffect(() => {
        const fetchCar = async () => {
          try {
            const detailsCarRef = doc(collection(myFS, 'Cars'), objectId);
            const carSnapshot = await getDoc(detailsCarRef);
            setCar(carSnapshot.data());
            setLoading(false);

            if(!carSnapshot.exists()) {
                console.log('non esiste');
            }

          } catch (error) {
            console.error('Error fetching cars:', error)
            setLoading(false);
          }
        };

        fetchCar();
    }), [myFS, objectId];



    return (
        <div>
            {loading ? (<p>Loading...</p>) : (    
            <div className="detail-container">
                <h1> Detail of {car.brand} {car.model}</h1>
                <img src={car.imgUrl}></img>
                <p>ID: {objectId}</p>
                <p>Year: {car.year}</p>
            </div>
            )}
        </div>
    );
};

export default Details;