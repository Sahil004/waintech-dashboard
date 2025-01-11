import React from 'react';
import AddEmployees from './employees/AddEmployees';
import EmployeesList from './employees/EmployeesList';
import Header from './Header';
import Sidebar from './Sidebar';
import '../assets/css/dashboard.css';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './product/AddProduct';
import ProductsList from './product/ProductsList';
import DashboardOverview from './DashboardOverview';

const Dashboard = () => {

    // Function to handle adding an employee
    const handleAddEmployee = (employeeData) => {
        console.log('Employee added:', employeeData);

        // Retrieve existing employees from localStorage
        const savedEmployees = JSON.parse(localStorage.getItem('employees')) || [];

        // Add new employee to the list
        savedEmployees.push(employeeData);

        // Save updated employee list back to localStorage
        localStorage.setItem('employees', JSON.stringify(savedEmployees));
    };

    return (
        <div className='container-fluid'>
            <div className='dashboard row'>
                <div className="d-none d-lg-block col-md-3 col-xl-2 col p-0">
                    <Sidebar />
                </div>
                <div className="col-12 col-lg-9 col-xl-10 p-0">
                    <Header />
                    <main className='container'>
                        <div className='main px-3 pt-3 px-lg-4 pt-lg-4'>
                            <Routes>
                                <Route path="/" element={<DashboardOverview />} />
                                <Route path="products/create-product" element={<AddProduct />} />
                                <Route path="products/edit-product/:id" element={<AddProduct />} />
                                <Route path="products/products-list" element={<ProductsList />} />
                                {/* Pass the onAddEmployee function as a prop */}
                                <Route path="employees/add-employee" element={<AddEmployees onAddEmployee={handleAddEmployee} />} />
                                <Route path="employees/edit-employee/:id" element={<AddEmployees onAddEmployee={handleAddEmployee} />} />
                                <Route path="employees/employee-list" element={<EmployeesList />} />
                            </Routes>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
