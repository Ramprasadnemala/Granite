import React, { useState } from 'react';
import './PopupForm.css'; // Import CSS file for styling
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import { Link } from 'react-router-dom';


const PopupForm = ({ onClose, loggedIn, setLoggedIn }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setGeneralError(''); // Clear the general error when user starts typing
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
    setGeneralError(''); // Clear the general error when field is focused
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const validCredentials = [
        { name: "murali", password: "murali@@1002" },
        { name: "user", password: "user@@1002" }
      ];

      const isValidUser = validCredentials.some(
        cred => cred.name.toLowerCase() === formData.name.toLowerCase() && cred.password === formData.password
      );

      if (isValidUser) {
        // Close the popup
        onClose();
        setLoggedIn(true);
      } else {
        setGeneralError('Invalid credentials. Please enter the correct');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };


  const formClose = (e) => {
    onClose();
    setLoggedIn(true);
  };
  return (
    <div className="popup2002">
      <div className="popup-inner2002">
        <button className="close-btn2002" onClick={onClose}>X</button>
        <h2>Login</h2><hr />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              style={{width:"220px"}} 
              placeholder='please enter your name' 
              value={formData.name} 
              onChange={handleChange}
              onFocus={handleFocus}
            /><br />
            {generalError && <span className="error-message" style={{fontSize:"12px", color:"orange"}}>*{generalError}</span>}
            {errors.name && <span className="error-message" style={{fontSize:"13px", color:"orange"}}>*{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder='please enter your password'
                value={formData.password}
                onChange={handleChange}
                onFocus={handleFocus}
              />
              <span className="password-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {generalError && <span className="error-message" style={{fontSize:"12px", color:"orange"}}>*{generalError}</span>}
            {errors.password && <span className="error-message" style={{fontSize:"13px",color:"orange"}}>*{errors.password}</span>}
          </div>
          {formData.name.toLowerCase() === "murali" && formData.password === "murali@@1002" ? (
            <Link to="/components/AllData/AllData">
              <button type="submit" onClick={formClose}>Submit</button>
            </Link>
          ) : formData.name.toLowerCase() === "user" && formData.password === "user@@1002" ? (
            <Link to="/components/AllData/AllUserData">
              <button type="submit" onClick={formClose}>Submit</button>
            </Link>
          ) : (
            <button type="submit">Submit</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default PopupForm;
