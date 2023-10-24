// import { Routes, Route, Navigate } from "react-router";

const Sidebar = () => {
  return (
    // Sidebar.js
    <nav className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div className="position-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Reports
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Settings
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}



export default Sidebar;
