
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VehicleList from './components/dashboard/VehicleList';
import EditVehicle from './components/dashboard/EditVehicle';
import AddVehicle from './components/dashboard/AddVehicle';

import Sidebar from './components/common/sidebar';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9 py-3 bg-lighter">
            <Routes>
              <Route path="/edit/:vehicleId" element={<EditVehicle/>} />
              <Route path="/addVehicle" element={<AddVehicle />}/>
                
              <Route path="/addCustomer" >
               
              </Route>
              <Route path="/" element={<VehicleList />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
