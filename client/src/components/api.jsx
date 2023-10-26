import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api';

//only one with fetch request
export const fetchVehicles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicles`);
    if (!response.ok) throw new Error('Failed to fetch vehicles');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
};

export const updateVehicle = async (vehicleId, updatedData) => {
  try {
    console.log(updatedData);
    const response = await axios.put(`${API_BASE_URL}/vehicles/${vehicleId}`, updatedData);
    if (response.status !== 200) throw new Error('Failed to update vehicle data');
    console.log('Vehicle data updated successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating vehicle data:', error);
    throw error;
  }
};

export const createVehicle = async (vehicleData) => {
  try {
    console.log("data");
    console.log(vehicleData);
    const response = await axios.post(`${API_BASE_URL}/vehicles`, vehicleData);
    if (response.status !== 201) throw new Error(response.data.error || 'Failed to create vehicle');

    console.log('Vehicle created successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating vehicle:', error);
    throw error;
  }
};

export const deleteVehicle = async (vehicleId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/vehicles/${vehicleId}`);
    if (response.status !== 200) throw new Error('Failed to delete vehicle');
    console.log('Vehicle deleted successfully');
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    throw error;
  }
};
export const fetchVehicleById = async (vehicleId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/vehicles/${vehicleId}`);
    if (response.status !== 200) throw new Error('Failed to fetch vehicle details');
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    throw error;
  }
};

export const fetchMakers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/makers/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching makers:', error);
    throw error;
  }
};

export const fetchModels = async (selectedMake) => {
  if (!selectedMake) {
    return [];
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/vehicleModel/${selectedMake}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching models based on make:', error);
    throw error;
  }
};

