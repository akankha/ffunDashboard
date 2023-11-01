import { useState, useEffect } from 'react';
import { fetchVehicles, deleteVehicle,fetchVehicleById } from '../api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import EditVehicle from './EditVehicle';
const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const [editModalShow, setEditModalShow] = useState(false); // State for showing/hiding the edit modal
  const [vehicleToEdit, setVehicleToEdit] = useState(null); // State for the vehicle to edit


  const itemsPerPage = 10;
 

  useEffect(() => {
    fetchVehicles()
      .then(data => {
        const sortedVehicles = [...data].sort((a, b) => a.id - b.id);
        setVehicles(sortedVehicles);
        setFilteredVehicles(sortedVehicles);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


const handleEdit = async (vehicleId) => {
  try {
    const vehicleData = await fetchVehicleById(vehicleId);
   
    setVehicleToEdit(vehicleData);
    setEditModalShow(true);
  }catch (error) {
    console.error('Error fetching vehicle:', error);
    // Handle the error appropriately
  }
};
const refreshVehicleData = async () => {
  try {
    const updatedVehicles = await fetchVehicles();
    const sortedVehicles = [...updatedVehicles].sort((a, b) => a.id - b.id); // Sorting by ID
    setVehicles(sortedVehicles);
    setFilteredVehicles(sortedVehicles);
  } catch (error) {
    console.error('Error refreshing vehicle data:', error);
  }
};
  const handleCloseEditModal = () => {
    setEditModalShow(false); // Close the edit modal
    setVehicleToEdit(null); // Reset the vehicle to edit
  };
  const handleSearchChange = (e) => {
    const value = e.target.value.toString();
    setSearchValue(value);
    
    const filtered = vehicles.filter(vehicle => 
      vehicle.id.toString().includes(value) ||
      vehicle.make.toLowerCase().includes(value) ||
      vehicle.model.toLowerCase().includes(value) ||
      vehicle.year.toString().includes(value)
    );
    setFilteredVehicles(filtered);
    setCurrentPage(1);
  };
  const totalVehicleCount = filteredVehicles.length;
  const totalPages = Math.ceil(totalVehicleCount / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handlePageChange = (page) => setCurrentPage(page);

  const handleDelete = async (vehicleId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this vehicle?');
    if (shouldDelete) {
      try {
        await deleteVehicle(vehicleId);
        const updatedVehicles = vehicles.filter(v => v.id !== vehicleId);
        setVehicles(updatedVehicles);
        setFilteredVehicles(updatedVehicles); 
        setIsConfirmationVisible(true);
        setVehicleToDelete(vehicleId);
        setTimeout(() => {
          setIsConfirmationVisible(false);
          setVehicleToDelete(null);
        }, 3000);
      } catch (error) {
        console.error('Error deleting vehicle:', error);
      }
    }
};


  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    let sorted = [...filteredVehicles];
    switch (e.target.value) {
      case 'priceLowHigh':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'yearLowHigh':
        sorted.sort((a, b) => a.year - b.year);
        break;
      case 'yearHighLow':
        sorted.sort((a, b) => b.year - a.year);
        break;
      case 'status':
        sorted.sort((a, b) => {
          if (a.status === 'In stock' && b.status !== 'In stock') return -1;
          if (b.status === 'In stock' && a.status !== 'In stock') return 1;
          return a.status.localeCompare(b.status);
        });
        break;
        
      default:
        break;
    }
    setCurrentPage(1);
    setFilteredVehicles(sorted);
  };

  const currentVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const soldCount = vehicles.filter(vehicle => vehicle.status === 'Sold').length;
  const inStockCount = vehicles.filter(vehicle => vehicle.status === 'In stock').length;

  // Data for bar chart
  const barChartData = [
    { name: 'Sold', count: soldCount },
    { name: 'In Stock', count: inStockCount }
  ];
  
  return (

    <div className="container mt-5">
      <h2 className="mb-4 font-weight-bold">Vehicle List</h2>

      <div className="container mb-4 bg-light p-4 rounded">
        <BarChart width={300} height={200} data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#007BFF" />
        </BarChart>
      </div>

      <div className="mb-4">
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-md-9 d-flex justify-content-end">
            <div className="w-50 d-flex align-items-center justify-content-end">
              <label htmlFor="sortOption" className="form-label mr-2">Sort by:</label>
              <select
                className="form-select"
                id="sortOption"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="">Select</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="yearLowHigh">Year: Low to High</option>
                <option value="yearHighLow">Year: High to Low</option>
                <option value="status">In stock</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {isConfirmationVisible && (
        <div className="alert alert-danger mb-4" role="alert">
          Vehicle with ID {vehicleToDelete} has been deleted.
        </div>
      )}

      <table className="table table-hover">
      <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Model</th>
            <th>Year</th>
            <th>Vin</th>
            <th>Price</th>
            <th>Color</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          
          {currentVehicles.map(vehicle => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>{vehicle.vin}</td>
              {/* <td>${parseInt(vehicle.price).toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</td> */}     
              {/* <td>
               ${parseFloat(vehicle.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td> */}
              <td>{vehicle.price}</td>
              <td>{vehicle.color}</td>
              <td>{vehicle.status}</td>
              <td>
              <button className="btn btn-primary mr-2" onClick={() => handleEdit(vehicle.id)}>Edit</button>

                <button className="btn btn-danger mr-2" onClick={() => handleDelete(vehicle.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center mt-4">
        <ul className="pagination">
        
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <a onClick={() => handlePageChange(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
  
      </div>
      <EditVehicle
        show={editModalShow}
        handleClose={handleCloseEditModal}
        vehicle={vehicleToEdit}
        onVehicleUpdated={refreshVehicleData}
      />
    </div>




  );
};

export default VehicleList;



