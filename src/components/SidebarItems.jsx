import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SidebarItems = () => {
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);

  const toggleEmployeeMenu = () => setIsEmployeeOpen(!isEmployeeOpen);
  const toggleProductMenu = () => setIsProductOpen(!isProductOpen);

  return (
    <ul className='sidebar-body list-group px-3 list-unstyled'>
      <span className='fw-bold py-3'>Dashboard</span>

      {/* Home Link */}
      <li className="li-border">
        <Link className='dashboard-item list-group-item list-group-item-action' to="/">
          <i className="bi bi-laptop me-3"></i>Home
        </Link>
      </li>

      {/* Employee Section */}
      <li className='li-border' onClick={toggleEmployeeMenu}>
        <Link className='dashboard-item list-group-item list-group-item-action'>
          <i className="bi bi-person me-3"></i>Employees
        </Link>
      </li>
      {isEmployeeOpen && (
        <ul className='sub-list ps-5' style={{ listStyleType: 'disc' }}>
          <li>
            <Link className='dashboard-sub-item list-group-item list-group-item-action fw-medium' to="/employees/add-employee">
              Add Employee
            </Link>
          </li>
          <li>
            <Link className='dashboard-sub-item list-group-item list-group-item-action fw-medium' to="/employees/employee-list">
              Employee List
            </Link>
          </li>
        </ul>
      )}

      {/* Product Section */}
      <li className='li-border' onClick={toggleProductMenu}>
        <Link className='dashboard-item list-group-item list-group-item-action'>
          <i className="bi bi-box me-3"></i>Products
        </Link>
      </li>
      {isProductOpen && (
        <ul className='sub-list ps-5' style={{ listStyleType: 'disc' }}>
          <li>
            <Link className='dashboard-sub-item list-group-item list-group-item-action fw-medium' to="/products/create-product">
              Add Product
            </Link>
          </li>
          <li>
            <Link className='dashboard-sub-item list-group-item list-group-item-action fw-medium' to="/products/products-list">
              Product List
            </Link>
          </li>
        </ul>
      )}
    </ul>
  );
};

export default SidebarItems;
