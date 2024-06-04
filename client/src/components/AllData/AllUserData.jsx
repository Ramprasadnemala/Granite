import React, { useState } from 'react';
import './AllUserData.css';

const AllUserData = () => {
  const [formData, setFormData] = useState({
    date: '',
    DC_No: '',
    vehicleNo: '',
    materialType: '',
    transportName: '',
    sourcePlace: '',
    gross: '',
    tare: '',
    net: '',
    loadingTime: '',
    unloadingTime: '',
    royalty: '',
    remarks: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === 'gross' || name === 'tare') {
      const gross = parseFloat(updatedFormData.gross) || 0;
      const tare = parseFloat(updatedFormData.tare) || 0;
      updatedFormData.net = gross - tare;
    }

    setFormData(updatedFormData);
    setFormErrors({ ...formErrors, [name]: '' }); // Clear the error message for the field being edited
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.date) errors.date = 'Date is required';
    if (!formData.DC_No) errors.DC_No = 'DC No is required';
    if (!formData.vehicleNo) errors.vehicleNo = 'VehicleNo is required';
    if (!formData.materialType) errors.materialType = 'MaterialType is required';
    if (!formData.transportName) errors.transportName = 'TransportName is required';
    if (!formData.sourcePlace) errors.sourcePlace = 'SourcePlace is required';
    if (!formData.gross) errors.gross = 'Gross is required';
    if (!formData.tare) errors.tare = 'Tare is required';
    if (!formData.net) errors.net = 'Net is required';
    if (!formData.royalty) errors.royalty = 'Royalty is required';
    if (!formData.loadingTime) errors.loadingTime = 'LoadingTime is required';
    if (!formData.unloadingTime) errors.unloadingTime = 'UnloadingTime is required';
    if (!formData.remarks) errors.remarks = 'Remarks is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmissionStatus('Please fill in all required fields.');
      return;
    }

    setSubmissionStatus('Submitting...');

    try {
      const response = await fetch('https://granite-server.vercel.app/products/add-emp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('Form submitted successfully!');
        setFormData({
          date: '',
          DC_No: '',
          vehicleNo: '',
          materialType: '',
          transportName: '',
          sourcePlace: '',
          gross: '',
          tare: '',
          net:'',
          loadingTime: '',
          unloadingTime: '',
          royalty: '',
          remarks: '',
        });
      } else {
        const errorData = await response.json();
        setSubmissionStatus(`Failed to submit form: ${errorData.message}`);
      }
    } catch (error) {
      setSubmissionStatus(`An error occurred while submitting the form: ${error.message}`);
    }
  };

  return (
    <div className="container2001">
      <form className="form2001" onSubmit={handleSubmit}>
        <h2>Daily Updates</h2>
        <span className="underline">.</span>
        <div className="full-width">
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
          {formErrors.date && <span className="error" style={{fontSize:"11px",color:"red"}}>*{formErrors.date}</span>}
        </div>
        <div className="full-width">
          <label>DC No:</label>
          <input type="text" name="DC_No" placeholder="please enter DC No" value={formData.DC_No} onChange={handleChange} />
          {formErrors.DC_No && <span className="error" style={{fontSize:"11px",color:"red"}}>*{formErrors.DC_No}</span>}
        </div>
        <div className="full-width">
          <label>Vehicle No:</label>
          <input type="text" name="vehicleNo" placeholder="please enter vehicleNo" value={formData.vehicleNo} onChange={handleChange} />
          {formErrors.vehicleNo && <span className="error" style={{fontSize:"11px",color:"red"}}>*{formErrors.vehicleNo}</span>}
        </div>
        <div className="full-width3">
          <label>Material Type:</label>
          <select name="materialType" value={formData.materialType} onChange={handleChange}>
            <option value="">--select option--</option>
            <option value="10kg to 1ton">10kg to 1ton</option>
            <option value="1ton to 3ton">1ton to 3ton</option>
            <option value="3ton to 6ton">3ton to 6ton</option>
            <option value="6ton to 10ton">6ton to 10ton</option>
          </select>
          {formErrors.materialType && <span className="error" style={{fontSize:"11px",color:"red"}}>*{formErrors.materialType}</span>}
        </div>
        <div className="full-width">
          <label>Transport:</label>
          <input type="text" name="transportName" placeholder="please enter transport" value={formData.transportName} onChange={handleChange} />
          {formErrors.transportName && <span className="error" style={{fontSize:"11px",color:"red"}}>*{formErrors.transportName}</span>}
        </div>
        <div className="full-width">
          <label>Source of Place:</label>
          <input type="text" name="sourcePlace" placeholder="please enter source" value={formData.sourcePlace} onChange={handleChange} />
          {formErrors.sourcePlace && <span className="error" style={{fontSize:"11px",color:"red"}}>*{formErrors.sourcePlace}</span>}
        </div>
        <div className="full-width">
          <label>Gross:</label>
          <input type="number" name="gross" placeholder="please enter gross" value={formData.gross} onChange={handleChange} />
          {formErrors.gross && <span className="error" style={{fontSize:"11px",color:"red"}}>*{formErrors.gross}</span>}
        </div>
        <div className="full-width">
          <label>Tare:</label>
          <input type="number" name="tare" placeholder="please enter tare" value={formData.tare} onChange={handleChange} />
          {formErrors.tare && <span className="error" style={{fontSize:"11px",color:"red"}}>*{formErrors.tare}</span>}
        </div>
        <div className="full-width">
          <label>Net:</label>
          <input type="number" name="net" placeholder="please enter net" value={formData.net} readOnly />
        </div>
        <div className="full-width">
          <label>Royalty:</label>
          <input type="number" name="royalty" placeholder="please enter royalty" value={formData.royalty} onChange={handleChange} />
          {formErrors.royalty && <span className="error" style={{fontSize:"11px",color:"red"}}>*{formErrors.royalty}</span>}
        </div>
        <div className="full-width">
          <label>Loading Time:</label>
          <input type="time" name="loadingTime" value={formData.loadingTime} onChange={handleChange} />
          {formErrors.loadingTime && <span className="error" style={{fontSize:"11px",color:"red"}}>*{formErrors.loadingTime}</span>}
        </div>
        <div className="full-width">
          <label>Unloading Time:</label>
          <input type="time" name="unloadingTime" value={formData.unloadingTime} onChange={handleChange} />
          {formErrors.unloadingTime && <span className="error" style={{fontSize:"11px",color:"red"}}>*{formErrors.unloadingTime}</span>}
        </div>
        <div className="full-width2">
          <label>Remarks:</label>
          <textarea name="remarks" placeholder="please enter remarks" value={formData.remarks} onChange={handleChange}></textarea>
          {formErrors.remarks && <span className="error" style={{fontSize:"11px",color:"red"}}>*{formErrors.remarks}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
      {submissionStatus && <p style={{fontSize:"14px",color:"rgb(116, 114, 114)"}}>{submissionStatus}</p>}
    </div>
  );
};

export default AllUserData;
