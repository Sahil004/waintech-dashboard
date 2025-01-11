import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddEmployees = ({ onAddEmployee }) => {
    const { id } = useParams();  // Capture the ID for editing
    const navigate = useNavigate();

    // State for employee fields and errors
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [errors, setErrors] = useState({});

    // Effect hook to pre-fill form if editing an existing employee
    useEffect(() => {
        if (id) {
            const savedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
            const employee = savedEmployees.find(emp => emp.id === parseInt(id));
            if (employee) {
                setFirstName(employee.firstName);
                setLastName(employee.lastName);
                setMobileNumber(employee.mobileNumber);
                setEmailAddress(employee.emailAddress);
            }
        }
    }, [id]);  // Make sure the effect is dependent on the `id`

    // Basic validation for email and phone number
    const validateForm = () => {
        let formErrors = {};
        if (!firstName) formErrors.firstName = 'First Name is required';
        if (!lastName) formErrors.lastName = 'Last Name is required';
        if (!mobileNumber) formErrors.mobileNumber = 'Mobile Number is required';
        else if (!/^\d{10}$/.test(mobileNumber)) formErrors.mobileNumber = 'Mobile Number should be 10 digits';
        if (!emailAddress) formErrors.emailAddress = 'Email Address is required';
        else if (!/\S+@\S+\.\S+/.test(emailAddress)) formErrors.emailAddress = 'Email Address is invalid';

        return formErrors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            // Create the employee object
            const updatedEmployee = {
                firstName,
                lastName,
                mobileNumber,
                emailAddress,
                id: id || Date.now(),  // Use the existing ID for editing or create a new one
                createdAt: id ? undefined : new Date().toISOString(),  // Only set createdAt when adding a new employee
            };

            if (id) {
                // If editing an existing employee, update the employee in localStorage
                const savedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
                const updatedEmployees = savedEmployees.map(emp =>
                    emp.id === parseInt(id) ? { ...emp, firstName, lastName, mobileNumber, emailAddress } : emp
                );
                localStorage.setItem('employees', JSON.stringify(updatedEmployees));
            } else {
                // If adding a new employee, call the onAddEmployee function to handle the new employee
                onAddEmployee(updatedEmployee);
            }

            // Navigate back to the employee list page after submission
            navigate('/employees/employee-list');
        }
    };

    return (
        <div className="create-client bg-white rounded">
            <div className="page-header">
                <h5 className="p-4 mb-0">{id ? 'Edit Employee' : 'Add Employee'}</h5>
            </div>
            <hr className='m-0' />
            <div className="page-body p-4">
                <form onSubmit={handleSubmit} className="dashboard-form">
                    <div className="row form-section">
                        <div className="form-group col-md-6 col-lg-4 pb-3">
                            <label htmlFor="firstName">First Name *</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                                className={`form-control rounded ${errors.firstName ? 'is-invalid' : ''}`}
                            />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>
                        <div className="form-group col-md-6 col-lg-4 pb-3">
                            <label htmlFor="lastName">Last Name *</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                className={`form-control rounded ${errors.lastName ? 'is-invalid' : ''}`}
                            />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>
                        <div className="form-group col-md-6 col-lg-4 pb-3">
                            <label htmlFor="mobileNumber">Mobile Number *</label>
                            <input
                                type="text"
                                id="mobileNumber"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                placeholder="Mobile Number"
                                className={`form-control rounded ${errors.mobileNumber ? 'is-invalid' : ''}`}
                            />
                            {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
                        </div>
                        <div className="form-group col-md-6 col-lg-4 pb-3">
                            <label htmlFor="emailAddress">Email Address *</label>
                            <input
                                type="email"
                                id="emailAddress"
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                                placeholder="Email Address"
                                className={`form-control rounded ${errors.emailAddress ? 'is-invalid' : ''}`}
                            />
                            {errors.emailAddress && <div className="invalid-feedback">{errors.emailAddress}</div>}
                        </div>
                    </div>
                    <div className='dashboard-form-btn text-end'>
                        <button type="submit" className='btn btn-primary px-4 py-2 fw-semibold'>
                            {id ? 'Edit' : 'Add'} Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployees;
