import React, { useState, useEffect } from 'react';

const DashboardOverview = () => {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [employeesThisMonth, setEmployeesThisMonth] = useState(0); // Employee count for the current month
    const [recentEmployees, setRecentEmployees] = useState([]); // Top 5 recently added employees

    useEffect(() => {
        // Get employees from localStorage
        const savedEmployees = JSON.parse(localStorage.getItem('employees')) || [];

        // Update the state with the total number of employees
        setEmployeeCount(savedEmployees.length);

        // Calculate employees added this month
        const currentMonth = new Date().getMonth();
        const employeesAddedThisMonth = savedEmployees.filter(emp => {
            const employeeDate = new Date(emp.createdAt);
            return employeeDate.getMonth() === currentMonth;
        });
        setEmployeesThisMonth(employeesAddedThisMonth.length);

        // Get the Top 5 Recently Added Employees (sort by `createdAt` date)
        const sortedEmployees = savedEmployees
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by creation date (most recent first)
            .slice(0, 5); // Take top 5
        setRecentEmployees(sortedEmployees);

    }, []);

    // Function to format the date as mm/dd/yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1; // Months are zero-indexed
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    return (
        <div className="dashboard-overview">
            <h2>Employee Overview</h2>
            <div className="overview-metrics mb-4">
                <div className="metric-card">
                    <h4>Total Employees</h4>
                    <p>{employeeCount}</p>
                </div>
                <div className="metric-card">
                    <h4>Employees Added This Month</h4>
                    <p>{employeesThisMonth}</p>
                </div>
            </div>

            {/* Top 5 Recently Added Employees */}
            <div className="bg-white rounded">
                <div className="page-header">
                    <h5 className="p-4 mb-0">Top 5 Recently Added Employees</h5>
                </div>
                <div className="page-body h-100">
                    <div className="table-container rounded">
                        <div className="table-header py-3"></div>
                        {recentEmployees.length > 0 ? (
                            <table className="table mb-5 sticky-header">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Mobile Number</th>
                                        <th>Email Address</th>
                                        <th>Date of Joining</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentEmployees.map((emp) => (
                                        <tr key={emp.id}> {/* Assuming `id` is unique for each employee */}
                                            <td>{emp.firstName} {emp.lastName}</td>
                                            <td>{emp.mobileNumber}</td>
                                            <td>{emp.emailAddress}</td>
                                            <td>{formatDate(emp.createdAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center">No recent employees found.</p>
                        )}
                        <div className="table-footer py-3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
