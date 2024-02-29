import { useEffect, useState } from 'react';
import { useFirebaseContext } from '../providers/FirebaseProvider';
import { collection, getDocs } from 'firebase/firestore';

const Cars = () => {
    const { myFS } = useFirebaseContext();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
  
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
      
        fetchCars();
      }, [myFS]);
  
    return (
      <div>
        <h2>Cars</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {cars.map(car => (
              <li key={car.id}>
                <strong>{car.make} {car.model}</strong> - {car.year}, {car.country}<br />
                <strong>Price:</strong> ${car.price}<br />
                <strong>Transmission:</strong> {car.transmission}<br />
                <strong>Available:</strong> {car.available ? 'Yes' : 'No'}
              </li>
            ))}
          </ul>
        )}
        
      </div>
    );
  };
  
  export default Cars;