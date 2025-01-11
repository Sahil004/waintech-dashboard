import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Get employees from localStorage
        const savedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        
        // Update the state with the fetched employees
        setEmployees(savedEmployees);
    }, []);  // Only run once when the component mounts

    const deleteEmployee = (id) => {
        const updatedEmployees = employees.filter(employee => employee.id !== id);
        setEmployees(updatedEmployees);  // Update the state
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));  // Update localStorage
    };

    return (
        <div className="bg-white rounded">
            <div className="page-header">
                <h5 className="p-4 mb-0">Employee List</h5>
            </div>
            <div className="page-body p-4 h-100">
                <div className="table-container rounded">
                    <div className="table-header py-3"></div>
                    <table className="table mb-5 sticky-header">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Mobile Number</th>
                                <th>Email Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center">No employees found.</td>
                                </tr>
                            ) : (
                                employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.mobileNumber}</td>
                                        <td>{employee.emailAddress}</td>
                                        <td>
                                            <Link to={`/employees/edit-employee/${employee.id}`} className="btn action-btn">
                                                <i className="bi bi-pencil-fill text-primary"></i>
                                            </Link>
                                            <button className="btn action-btn" onClick={() => deleteEmployee(employee.id)}>
                                                <i className="bi bi-trash3-fill text-danger fw-bold"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <div className="table-footer py-3"></div>
                </div>
            </div>
        </div>
    );
};

export default EmployeesList;
