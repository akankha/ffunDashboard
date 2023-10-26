import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateVehicle, fetchVehicleById } from '../api';

const EditVehicle = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  
  const [vehicleData, setVehicleData] = useState({
    MakeName: '',
    ModelName: '',
    Price: '',
    Status: '',
  });
console.log(vehicleData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchVehicleById(vehicleId);
        if (fetchedData) {
          setVehicleData(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchData();
  }, [vehicleId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateVehicle(vehicleId, vehicleData);
      alert('Vehicle updated successfully!');
      navigate('/');
    } catch (error) {
      alert('Error updating the vehicle.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Make:</label>
          <b>{vehicleData.Make}</b>
        </div>

        <div className="mb-3">
          <label className="form-label">Model:</label>
          <b>{vehicleData.Model}</b> 
        </div>

        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="text"
            className="form-control"
            name="Price"  
            value={vehicleData.Price}  
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status:</label>
          <select
            className="form-select"
            name="Status"  
            value={vehicleData.Status}  
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Sold">Sold</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Update Vehicle
        </button>
      </form>
    </div>
  );
}

export default EditVehicle;
