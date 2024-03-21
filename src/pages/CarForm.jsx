import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { useFirebaseContext } from '../providers/FirebaseProvider';
import { Navbar } from '../components/Navbar';
import '../styles/CarForm.css';
import { useEffect } from 'react';

function CarForm() {
  const { myFS } = useFirebaseContext(); // Utilizza il valore restituito da useFirebaseContext

  const [formData, setFormData] = useState({
    favourites: false,
    price: '',
    model: '',
    brand: '',
    year: 0,
    description: '',
    story: '',
    maxPower: 0,
    acceleration: 0,
    maxSpeed: 0,
    imgUrl: '' 
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(myFS, 'Cars'), formData);
      console.log('Document written with ID: ', docRef.id);
      // Clear form data after submission
      setFormData({
        favourites: false,
        price: '',
        model: '',
        brand: '',
        year: 0,
        description: '',
        story: '',
        maxPower: 0,
        acceleration: 0,
        maxSpeed: 0,
        imgUrl: '' 
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="container">
      <Navbar/>
    <form onSubmit={handleSubmit} className="content">
      <div >
        <label>
          Favourites:
          <input type="checkbox" name="favourites" checked={formData.favourites} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input type="text" name="price" value={formData.price} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Model:
          <input type="text" name="model" value={formData.model} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Brand:
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Year:
          <select name="year" value={formData.year} onChange={handleChange}>
            {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </label>
      </div>
      <div>
        <label>
          Story:
          <textarea name="story" value={formData.story} onChange={handleChange}></textarea>
        </label>
      </div>
      <div>
        <label>
          Max Power (CV):
          <input type="number" name="maxPower" value={formData.maxPower} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Acceleration (seconds):
          <input type="number" name="acceleration" value={formData.acceleration} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Max Speed (km/h):
          <input type="number" name="maxSpeed" value={formData.maxSpeed} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Image URL:
          <input type="text" name="imgUrl" value={formData.imgUrl} onChange={handleChange} />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default CarForm;
