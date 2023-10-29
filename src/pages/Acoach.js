import React, { useState, useEffect } from 'react';
import coachesData from '../json/coaches';
import Fside from '../components/Aside';
import Fhead from '../components/Header';
import CoachForm from '../components/CoachForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Acoach = () => {
  const [coaches, setCoaches] = useState(coachesData); 
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);

  useEffect(() => {
    // Fetch coaches' data when the component mounts
    fetch('http://localhost:3000/get-coaches')
      .then((response) => response.json())
      .then((data) => setCoaches(data))
      .catch((error) => console.error('Error fetching coaches:', error));
  }, []);


  const handleSaveCoach = (editedCoach) => {
    if (editedCoach.id) {
      setCoaches((prevCoaches) =>
        prevCoaches.map((coach) =>
          coach.id === editedCoach.id ? { ...coach, ...editedCoach } : coach
        )
      );
    } else {
      // Add a new coach
      const newCoach = { ...editedCoach, id: coaches.length + 1 };
      setCoaches((prevCoaches) => [...prevCoaches, newCoach]);
    }
    setShowAddForm(false);
  };

  const handleCoachClick = (coach) => {
    setSelectedCoach(coach);
  };

  return (
    <div className="app">
      <Fside />
      <div className="app-main">
        <Fhead />
        <div>
          <h1 style={{fontFamily: "Footlight MT Light"}}>All Coaches</h1>
          <table className="coach-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Sport</th>
              </tr>
            </thead>
            <tbody>
              {coaches.map((coach) => (
                <tr
                  key={coach.id}
                  className={`coach-row ${selectedCoach === coach ? 'selected' : ''}`}
                  onClick={() => handleCoachClick(coach)}
                >
                  <td>{coach.id}</td>
                  <td>{coach.username}</td>
                  <td>{coach.sport}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="coach-details">
            {selectedCoach && (
              <>
                <h2>Coach Details</h2>
                <p><strong>ID:</strong> {selectedCoach.id}</p>
                <p><strong>Name:</strong> {selectedCoach.username}</p>
                <p><strong>Sport:</strong> {selectedCoach.sport}</p>
                <p><strong>Experience:</strong> {selectedCoach.experience}</p>
              </>
            )}
          </div>
          {!showAddForm && (
            <div className="add-coach" onClick={() => setShowAddForm(true)}>
              <span className="plus-symbol"><FontAwesomeIcon icon={faPlus} className="icon" /></span>
            </div>
          )}
          {showAddForm && <CoachForm onSave={handleSaveCoach} setCoaches={setCoaches} />}
        </div>
      </div>
    </div>
  );
};

export default Acoach;
