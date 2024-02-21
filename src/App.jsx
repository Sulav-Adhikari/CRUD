import React, { useState } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import List from './components/List';
import Update from './components/Update';
import axios from "axios";
import './App.css'; 

function App() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [selectionStatus, setSelectionStatus] = useState(false);
  const [showInternList, setShowInternList] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");

    if (!name || !address || !dob) {
      alert("Please fill in all fields");
      return;
    }
    axios
      .post("http://localhost:3000/interns", {
        name: name,
        address: address,
        dob: dob,
        selectionStatus: selectionStatus,
      })
      .then(() => {
        console.log("Intern added successfully on console");
        setSuccessMessage("Intern added successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error adding intern:", error);
      });
  };

  const handleToggleInternList = () => {
    setShowInternList(!showInternList);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Intern Status Form</h1>
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    id="address"
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth:</label>
                  <input
                    id="dob"
                    type="date"
                    className="form-control"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    id="selectionStatus"
                    className="form-check-input"
                    type="checkbox"
                    checked={selectionStatus}
                    onChange={(e) => setSelectionStatus(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="selectionStatus">Selection Status</label>
                </div>
                <button type="submit" className="btn btn-primary submit-btn">
                  Submit
                </button>
              </form>

              <div className='btn-show'>
                    <Link
                      to="/table"
                      type="button"
                      className="btn btn-secondary mt-2"
                      onClick={handleToggleInternList}
                    >
                      {showInternList ? "Hide Interns" : "Show Interns"}
                    </Link>

              </div>
            </div>
          </div>
          {showInternList && (
            <Routes>
              <Route path="/table" element={<List />} />
              <Route path="/edit/:id" element={<Update />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
