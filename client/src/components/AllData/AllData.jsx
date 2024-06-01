import React, { useState, useMemo, useEffect } from 'react';
import './AllData.css'; // Import CSS file for styling

const AllData = () => {
    const [ProjectData, setProjectData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCriteria, setFilterCriteria] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State to handle popup visibility
    const [popupLocation, setPopupLocation] = useState(''); // State to store the location for the popup

   

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await fetch('');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProjectData(data);
          } catch (err) {
             console.log("Error:", err);
          }
        };
    
        getData();
      }, []);

      const filteredData = useMemo(() => {
        return ProjectData.filter(item => {
            if (filterCriteria === 'materialType') {
                return item.materialType.includes(searchQuery);
            } else if (filterCriteria === 'date') {
                return item.date.includes(searchQuery);
            }else if (filterCriteria === 'sourcePlace') {
                return item.sourcePlace.includes(searchQuery);
            }else {
                return true; // If no filter criteria selected, show all data
            }
        });
    }, [ProjectData, filterCriteria, searchQuery]);



    const handleWorkButtonClick = (location) => {
        // Set showPopup state to true when button is clicked
        setShowPopup(true);
        // Set the location for the popup
        setPopupLocation(location);
    };

    return (
        <>
            <div className='container2002'>
                <input
                    type='search'
                    className='search2001'
                    placeholder='Search by Date or sourcePlace'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <select
                    value={filterCriteria}
                    onChange={e => setFilterCriteria(e.target.value)}
                    style={{borderRadius:"5px"}}
                >
                    <option value=''>Filter By</option>
                    <option value='materialType'>materialType</option>
                    <option value='date'>Date</option>
                    <option value='sourcePlace'>sourcePlace</option>
                </select>
            </div>

            <div className="table-container">
                <div className="table-wrapper2001">
                    <table className="table2001">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>DC_No</th>
                                <th>VehicleNo</th>
                                <th>Material</th>
                                <th>Transport</th>
                                <th>SOP</th>
                                <th>Gross</th>
                                <th>Tare</th>
                                <th>Net</th>
                                <th>Loading</th>
                                <th>UnLoading</th>
                                <th>Royalty</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.DC_No}</td>
                                    <td>{item.vehicleNo}</td>
                                    <td>{item.materialType}</td>
                                    <td>{item.transportName}</td>
                                    <td>{item.sourcePlace}</td>
                                    <td>{item.gross}</td>
                                    <td>{item.tare}</td>
                                    <td>{item.net}</td>
                                    <td>{item.loadingTime}</td>
                                    <td>{item.unloadingTime}</td>
                                    <td>{item.royalty}</td>
                                    <td>
                                        {/* Pass location to handleWorkButtonClick */}
                                        <button onClick={() => handleWorkButtonClick(item.remarks)}>Remark</button>
                                    </td>
                                    
                                </tr>
                            ))}
                           
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Popup/Modal */}
            {showPopup && (
                <div className="popup-overlay2001">
                    <div className="popup2001">
                        <h2>Location</h2>
                        <p>{popupLocation}</p> {/* Display location */}
                        <button onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AllData;
