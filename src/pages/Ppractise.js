import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Header from '../components/Header';
import Cside from '../components/SideBar';
import practiseData from '../json/practices'; // Import the JSON data

const Practise = () => {
  const [practiseEvents, setPractiseEvents] = useState([]);
  const [selectedPractise, setSelectedPractise] = useState(null);

  const dateFormat = 'YYYY-MM-DD';
  const timeFormat = 'HH:mm:ss';

  useEffect(() => {
    setPractiseEvents(practiseData); // Set practice events from imported JSON
  }, []);

  const handlePractiseSelect = (practise) => {
    setSelectedPractise(practise);
  };

  return (
    <div>
      <div className="app">
        <Cside />
        <div className="app-main">
          <Header />

          <br></br>
          <ul>
            {practiseEvents.length > 0 ? (
              practiseEvents.map((event) => (
                <li
                  key={event._id.$oid}
                  onClick={() => handlePractiseSelect(event)}
                  className={selectedPractise && selectedPractise._id.$oid === event._id.$oid ? 'selected' : ''}
                >
                  {event.name} - {moment(event.date.$date).format('MMMM DD, YYYY')} - {moment(event.startTime, timeFormat).format('hh:mm A')} - {moment(event.endTime, timeFormat).format('hh:mm A')}
                </li>
              ))
            ) : (
              <li>No practice events available.</li>
            )}
          </ul>
          <div className="practise-details">
            {selectedPractise ? (
              <>
                <h2>{selectedPractise.name}</h2>
                <p>Date: {moment(selectedPractise.date.$date).format('MMMM DD, YYYY')}</p>
                <p>
                  Time: {moment(selectedPractise.startTime, timeFormat).format('hh:mm A')} -{' '}
                  {moment(selectedPractise.endTime, timeFormat).format('hh:mm A')}
                </p>
                <p>Location: {selectedPractise.location}</p>
                <p>Sport: {selectedPractise.sport}</p>
                <p>Coach: {selectedPractise.coach}</p>
                <p>Description: {selectedPractise.description}</p>
              </>
            ) : (
              <div className="no-selection">
                <h2>Practice Details</h2>
                <p>Select a practice event to view details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practise;
