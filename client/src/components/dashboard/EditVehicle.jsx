import  { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateVehicle } from '../api'; // Ensure this is the correct path to your API functions
import { useNavigate } from 'react-router-dom';

const EditVehicle = ({ show, handleClose, vehicle,onVehicleUpdated }) => {
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState({
    ID:'',
    Make: '',
    Model: '',
    Vin: '',
    Price: '',
    Status: '',
    Color:'',
  });

  useEffect(() => {
    
    if (vehicle) {
      setVehicleData({
        ID: vehicle.ID,
        MakeName: vehicle.Make,
        ModelName: vehicle.Model,
        Vin: vehicle.Vin,
        Price: vehicle.Price,
        Status: vehicle.Status,
        Color: vehicle.Color,
      });
    }
  }, [vehicle]);

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
     console.log(vehicleData);
      await updateVehicle(vehicle.id, vehicleData);
      alert('Vehicle updated successfully!');
      handleClose(); // Close the modal after updating
      navigate('/');
      if (onVehicleUpdated) {
        onVehicleUpdated(); // Call the callback function to refresh data
      }
      
    } catch (error) {
      alert('Error updating the vehicle.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Vehicle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Make:</Form.Label>
            <Form.Control
              type="text"
              name="MakeName"
              disabled
              value={vehicleData.MakeName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Model:</Form.Label>
            <Form.Control
              type="text"
              disabled
              name="ModelName"
              value={vehicleData.ModelName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Vin:</Form.Label>
            <Form.Control
              type="text"
              name="Vin"
              value={vehicleData.Vin}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              value={vehicleData.Price}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Color:</Form.Label>
            <Form.Control
              type="text"
              name="Color"
              value={vehicleData.Color}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Status:</Form.Label>
            <Form.Check
              type="radio"
              label="In Stock"
              name="Status"
              value="In Stock"
              checked={vehicleData.Status === "In Stock"}
              onChange={handleInputChange}
            />
            <Form.Check
              type="radio"
              label="Sold"
              name="Status"
              value="Sold"
              checked={vehicleData.Status === "Sold"}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Vehicle
          </Button>
        </Form>
      </Modal.Body>
      
    </Modal>
  );
};

export default EditVehicle;
