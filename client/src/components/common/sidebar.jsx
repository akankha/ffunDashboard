
import { Link } from 'react-router-dom';
import { FaCar,  FaList } from 'react-icons/fa';

function Sidebar() {
    return (
        <div className="sidebar bg-light p-4 h-100 position-fixed shadow-lg">
            <div className="text-center border-bottom pb-3">
                <img src="https://ffun.com/wp-content/uploads/2020/08/New-FFUn-header-gray.png" alt="Logo" className="img-fluid mb-3" style={{ maxWidth: '150px' }} />
                <h3>Dashboard</h3>
            </div>
            <ul className="nav flex-column mt-4">


            <li className="nav-item">
                    <Link to="/" className="nav-link  ">
                        <FaList className="mr-3" /> Vehicle List
                    </Link>
                </li>
                <li className="nav-item mb-3">
                    <Link to="/addVehicle" className="nav-link  ">
                        <FaCar className="mr-3" /> Add New Vehicle
                    </Link>
                </li>
            
                
            </ul>
        </div>
    );
}

export default Sidebar;
