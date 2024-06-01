import React, { useState } from 'react';
import './AllUserData.css';

const AllUserData = () => {
  const [formData, setFormData] = useState({
    date: '',
    DC_No: '',
    vehicleNo: '',
    materialType: 'select opation',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === 'gross' || name === 'tare') {
      const gross = parseFloat(updatedFormData.gross) || 0;
      const tare = parseFloat(updatedFormData.tare) || 0;
      updatedFormData.net = gross - tare;
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      } else {
        setSubmissionStatus('Failed to submit form.');
      }
    } catch (error) {
      setSubmissionStatus('An error occurred while submitting the form.');
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
        </div>
        <div className="full-width">
          <label>DC No:</label>
          <input type="text" name="DC_No" placeholder="please enter DC No" value={formData.DC_No} onChange={handleChange} />
        </div>
        <div className="full-width">
          <label>Vehicle No:</label>
          <input type="text" name="vehicleNo" placeholder="please enter vehicleNo" value={formData.vehicleNo} onChange={handleChange} />
        </div>
        <div className="full-width3">
          <label>Material Type:</label>
          <select name="materialType" value={formData.materialType} onChange={handleChange}>
            <option value="select opation">--select opation--</option>
            <option value="10kg to 1ton">10kg to 1ton</option>
            <option value="1ton to 3ton">1ton to 3ton</option>
            <option value="3ton to 6ton">3ton to 6ton</option>
            <option value="6ton to 10ton">6ton to 10ton</option>
          </select>
        </div>
        <div className="full-width">
          <label>Transport:</label>
          <input type="text" name="transportName" placeholder="please enter transport" value={formData.transportName} onChange={handleChange} />
        </div>
        <div className="full-width">
          <label>Source of Place:</label>
          <input type="text" name="sourcePlace" placeholder="please enter source" value={formData.sourcePlace} onChange={handleChange} />
        </div>
        <div className="full-width">
          <label>Gross:</label>
          <input type="number" name="gross" placeholder="please enter gross" value={formData.gross} onChange={handleChange} />
        </div>
        <div className="full-width">
          <label>Tare:</label>
          <input type="number" name="tare" placeholder="please enter tare" value={formData.tare} onChange={handleChange} />
        </div>
        <div className="full-width">
          <label>Net:</label>
          <input type="number" name="net" placeholder="please enter net" value={formData.net} readOnly />
        </div>
        <div className="full-width">
          <label>Royalty:</label>
          <input type="number" name="royalty" placeholder="please enter royalty" value={formData.royalty} onChange={handleChange} />
        </div>
        <div className="full-width">
          <label>Loading Time:</label>
          <input type="time" name="loadingTime" value={formData.loadingTime} onChange={handleChange} />
        </div>
        <div className="full-width">
          <label>Unloading Time:</label>
          <input type="time" name="unloadingTime" value={formData.unloadingTime} onChange={handleChange} />
        </div>
        <div className="full-width2">
          <label>Remarks:</label>
          <textarea name="remarks" placeholder="please enter remarks" value={formData.remarks} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
};

export default AllUserData;
