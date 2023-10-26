import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVehicle as createVehicleAPI,fetchMakers as fetchMakersAPI, fetchModels as fetchModelsAPI  } from '../api';


const AddVehicle = () => {
    const navigate = useNavigate();
  const [newVehicle, setNewVehicle] = useState({
    MakeID: '',
    ModelID: '',
    TypeID: '',
    Year: '',
    VIN: '',
    Color: '',
    Mileage: '',
    Price: '',
    Status: '',
  });
  const [makers, setMakers] = useState([]);
  const [models, setModels] = useState([]);
  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const yearRange = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

  useEffect(() => {
    fetchMakers();
  }, []);

  const fetchMakers = async () => {
    try {
      const data = await fetchMakersAPI();
      setMakers(data);
    } catch (error) {
      console.error('Error fetching makers:', error);
    }
  };
  
  const fetchModels = async (selectedMake) => {
    if (!selectedMake) {
      setModels([]);
      return;
    }
  
    try {
      const data = await fetchModelsAPI(selectedMake);
      setModels(data);
    } catch (error) {
      console.error('Error fetching models based on make:', error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMakeChange = async (e) => {
    const selectedMake = e.target.value;
    setNewVehicle((prev) => ({
      ...prev,
      MakeID: selectedMake,
      ModelID: '', 
    }));
    await fetchModels(selectedMake);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVehicleAPI(newVehicle);
      setNewVehicle({
        MakeID: '',
        ModelID: '',
        Year: '',
        VIN: '',
        Color: '',
        Mileage: '',
        Price: '',
        Status: '',
        TypeID: '',
      });
      alert("Vehicle added successfully!");
      navigate('/', { state: { successMessage: 'Vehicle added successfully!' } });
    } catch (error) {
      console.error('Error creating the vehicle:', error);
      alert("Error adding the vehicle.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Make:</label>
          <select
            className="form-select"
            name="MakeID"
            value={newVehicle.MakeID}
            onChange={handleMakeChange}
          >
            <option value="">Select a Make</option>
            {makers.map((maker) => (
              <option key={maker.MakeID} value={maker.MakeID}>
                {maker.MakeName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Model:</label>
          <select
            className="form-select"
            name="ModelID"
            value={newVehicle.ModelID}
            onChange={handleInputChange}
          >
            <option value="">Select a Model</option>
            {models.map((model) => (
              <option key={model.ModelID} value={model.ModelID}>
                {model.ModelName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Type:</label>
          <select
            className="form-select"
            name="TypeID"
            value={newVehicle.TypeID}
            onChange={handleInputChange}
        >
            <option value="">Select Vehicle Type</option>
    <option value="1">Sedan</option>
    <option value="2">Truck</option>
    <option value="3">SUV</option>
  </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Year:</label>
          <select
            name="Year"
            value={newVehicle.Year}
            onChange={handleInputChange}
            className="form-select"
          ><option value="">Select Vehicle Year</option>
            {yearRange.map((year) => (
                
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">VIN:</label>
          <input
            type="text"
            name="VIN"
            value={newVehicle.VIN}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Color:</label>
          <input
            type="text"
            name="Color"
            value={newVehicle.Color}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mileage:</label>
          <input
            type="number"
            name="Mileage"
            value={newVehicle.Mileage}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="number"
            name="Price"
            value={newVehicle.Price}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status:</label>
          <select
    className="form-select"
    name="Status"
    value={newVehicle.Status}
    onChange={handleInputChange}
  >
    <option value="">Select Status</option>
    <option value="In Stock">In Stock</option>
    <option value="Sold">Sold</option>
  </select>
        </div>
        <button type="submit" className="btn btn-primary me-2">
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
