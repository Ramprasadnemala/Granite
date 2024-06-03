import React, { useState } from 'react';
import './PopupForm.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons

const PopupForm = ({ onClose, loggedIn, setLoggedIn }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to backend
    console.log(formData);
    // Close the popup
    onClose();
  };

  const formClose = (e) => {
    onClose();
    setLoggedIn(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <div className="popup2002">
      <div className="popup-inner2002">
        <button className="close-btn2002" onClick={onClose}>X</button>
        <h2>Login</h2><hr />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" style={{width:"200px"}} placeholder='please enter your name' value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder='please enter your password '
                value={formData.password}
                onChange={handleChange}
              />
              <span className="password-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
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
            " "
          )}
        </form>
      </div>
    </div>
  );
}

export default PopupForm;
