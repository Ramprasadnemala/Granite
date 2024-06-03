import React, { useState, useEffect } from 'react';
import './HeaderSelect.css'; // Import CSS file for styling
import PopupForm from './PopupForm/PopupForm';
import { Link } from 'react-router-dom';

const HeaderSelect = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Check local storage for logged-in state on component mount
        const loggedInStatus = localStorage.getItem('loggedIn') === 'true';
        setLoggedIn(loggedInStatus);
    }, []);

    const togglePopup = () => {
        setShowPopup(prevState => !prevState);
    };

    const handleLogout = () => {
        // Perform logout action here, such as clearing session, resetting user state, etc.
        // Set logged-in state to false and remove from local storage
        setLoggedIn(false);
        localStorage.setItem('loggedIn', 'false');
    };

    const handleLogin = () => {
        // Set logged-in state to true and save to local storage
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
    };

    return (
        <>
            <nav className="navbar2001">
                <div className="nav-logo2001">
                    {/* <span><img src={crean} alt='crean' style={{ height: "50px", width: "70px", borderRadius: "10px" }} /></span> */}
                    {/* <Link to="./" style={{ color: '#fff',textDecoration:"none",cursor:"pointer" }}> */}
                    <span>GRANITES SERVICES</span>
                    {/* </Link> */}
                </div>
               
                {loggedIn ? (
                    <Link to="./">
                        <button className='login2001' onClick={handleLogout}>LogOut</button>
                    </Link>
                ) : (
                    <button className='login2001' onClick={togglePopup}>LogIn</button>
                )}
                {showPopup && <PopupForm setLoggedIn={handleLogin} onClose={togglePopup} />}
            </nav>
        </>
    );
}

export default HeaderSelect;
