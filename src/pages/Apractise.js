
import React, { useState, useEffect } from 'react';
  import moment from 'moment';
  import Header from '../components/Header';
  import Cside from '../components/Aside';
import Swal from 'sweetalert2';
import practiseData from '../json/practices';
const Practise = () => {
  const [practiseEvents, setPractiseEvents] = useState(practiseData);
  const [newPractiseEvent, setNewPractiseEvent] = useState({
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    sport: '',
    coach:'',
    description: '',
  });
  const dateFormat = 'YYYY-MM-DD';
  const timeFormat = 'HH:mm:ss';
  const [selectedPractise, setSelectedPractise] = useState(null);
  const [addedEvent, setAddedEvent] = useState(null);

  const fetchPractiseEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/get-practise-events');
      if (response.ok) {
        const data = await response.json();
        setPractiseEvents(data);
      } else {
        console.error('Failed to fetch practice events');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchPractiseEvents();
  }, []);
  const addPractiseEvent = async () => {
    try {
      // Validate if all required fields are filled
      if (
        !newPractiseEvent.name ||
        !newPractiseEvent.date ||
        !newPractiseEvent.startTime ||
        !newPractiseEvent.endTime ||
        !newPractiseEvent.location ||
        !newPractiseEvent.sport ||
        !newPractiseEvent.description
      ) {
        Swal.fire('Please fill in all required fields.','','error');
        return;
      }
  
      const formattedPractiseEvent = {
        ...newPractiseEvent,
        start: moment(newPractiseEvent.date + ' ' + newPractiseEvent.startTime).toDate(),
        end: moment(newPractiseEvent.date + ' ' + newPractiseEvent.endTime).toDate(),
      };
  
      const response = await fetch('/add-practice-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedPractiseEvent),
      });
  
      if (response.ok) {
        // Show an alert
        Swal.fire('Practice event added successfully','','success');
  
        // Clear the form fields
        setNewPractiseEvent({
          name: '',
          date: '',
          startTime: '',
          endTime: '',
          location: '',
          sport: '',
          coach:'',
          description: '',
        });
  
        // Fetch the updated practice events
        fetchPractiseEvents();
      } else {
        console.error('Failed to add practice event');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewPractiseEvent({
        ...newPractiseEvent,
        [name]: value,
      });
    };
  
    const handlePractiseSelect = (practise) => {
      setSelectedPractise(practise);
    };
    
  const handleCancelPractise = async () => {
    if (!selectedPractise) {
      alert('Please select a practice event to cancel.');
      return;
    }

    try {
      const response = await fetch(`/cancel-practice-event/${selectedPractise._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Show an alert
        Swal.fire('Practice event canceled successfully');

        // Clear the selected practice event
        setSelectedPractise(null);

        // Fetch the updated practice events
        fetchPractiseEvents();
      } else {
        console.error('Failed to cancel practice event');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="app">
        <Cside />
        <div className="app-main">
          <Header />
          <form>
            <h1 style={{fontFamily: "Footlight MT Light"}}>Practice Events</h1>
            <label>
              Event Name:
              <input
                type="text"
                name="name"
                value={newPractiseEvent.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={newPractiseEvent.date}
                onChange={handleInputChange}
             
              />
            </label>
            <label>
              Start Time:
              <input
                type="time"
                name="startTime"
                value={newPractiseEvent.startTime}
                onChange={handleInputChange}
             
              />
            </label>
            <label>
              End Time:
              <input
                type="time"
                name="endTime"
                value={newPractiseEvent.endTime}
                onChange={handleInputChange}
             
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={newPractiseEvent.location}
                onChange={handleInputChange}
             
              />
            </label>
            <label>
              Sport:
              <input
                type="text"
                name="sport"
                value={newPractiseEvent.sport}
                onChange={handleInputChange}
             
              />
            </label>
            <label>
              Coach:
              <input
              type="text"
                name="coach"
                value={newPractiseEvent.coach}
                onChange={handleInputChange}
             
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={newPractiseEvent.description}
                onChange={handleInputChange}
             
              ></textarea>
            </label>
            <button type="button" onClick={addPractiseEvent}>
              Add Practice Event
            </button>
            
              
           
          </form>
          <br></br>
          <ul>
            {practiseEvents.length > 0 ? (
              practiseEvents.map((event) => (
                <li
                  key={event._id}
                  onClick={() => handlePractiseSelect(event)}
                  className={selectedPractise && selectedPractise._id === event._id ? 'selected' : ''}
                >
                  {event.name} - {moment(event.date).format('MMMM DD, YYYY')} - {moment(event.startTime, timeFormat).format('hh:mm A')} - {moment(event.endTime, timeFormat).format('hh:mm A')}
                  
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
                <p>Date: {moment(selectedPractise.start).format('MMMM DD, YYYY')}</p>
                <p>
                  Time: {moment(selectedPractise.startTime, 'HH:mm').format('hh:mm A')} -{' '}
                  {moment(selectedPractise.endTime, 'HH:mm').format('hh:mm A')}
                </p>

                <p>Location: {selectedPractise.location}</p>
                <p>Sport: {selectedPractise.sport}</p>
                <p>Coach: {selectedPractise.coach}</p>
                <p>Description: {selectedPractise.description}</p>
                <br></br>
                <button type="button" onClick={handleCancelPractise}>
                Cancel Practice
              </button>
                 
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