import React, { useState, useEffect } from 'react';
import Page from '../components/Page';
import Cside from '../components/Aside';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import EventList from '../components/Reventlist'; // Import the EventList component
import eventsData from '../json/events';


import Swal from 'sweetalert2';
function Cevents() {
  const [events, setEvents] = useState(eventsData); 
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    category: '',
  });

  const [editEventId, setEditEventId] = useState(null);
  const [editedEvent, setEditedEvent] = useState({
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    category: '',
  });

  const [selectedEventId, setSelectedEventId] = useState(null); // Define selectedEventId state here

  const handleAddEvent = () => {
    // Create a new event object from your state
    Swal.fire("Successfully",'','success');
    const eventToAdd = {
      name: newEvent.name,
      date: newEvent.date,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      location: newEvent.location,
      category: newEvent.category,
    };
    

    // Make a POST request to add the event to the database
    fetch('http://localhost:3000/add-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventToAdd),
    })
      .then((response) => {
        if (response.status === 201) {
          // Event added successfully, you can update the UI or handle it as needed
          console.log('Event added successfully');
        } else {
          console.error('Failed to add event');
        }
      })
      .catch((error) => console.error(error));

    // Reset form and state
    setNewEvent({
      name: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      category: '',
    });

    setShowForm(false);
  };

  const handleEditEvent = () => {
    const eventIndex = events.findIndex((event) => event._id === editEventId);

    if (eventIndex !== -1) {
      events[eventIndex] = { _id: editEventId, ...editedEvent };
      setEvents([...events]);
      setEditEventId(null);
      setEditedEvent({
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        category: '',
      });
    }

    // Create a new event object from the editedEvent state
    const updatedEvent = {
      _id: editEventId, // Pass the event ID to identify which event to update
      name: editedEvent.name,
      date: editedEvent.date,
      startTime: editedEvent.startTime,
      endTime: editedEvent.endTime,
      location: editedEvent.location,
      category: editedEvent.category,
    };

    // Make a PUT request to update the event on the server
    fetch(`http://localhost:3000/update-event/${editEventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Event updated successfully');
          // You may want to update the events state here
          // You can fetch the updated events list from the server if needed
        } else {
          console.error('Failed to update event');
        }
      })
      .catch((error) => console.error(error));

    // Reset edit state
    setEditEventId(null);
    setEditedEvent({
      name: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      category: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({
      ...editedEvent,
      [name]: value,
    });
  };
  const handleCloseDetails = () => {
    setSelectedEventId(null);
  };
  const handleEditClick = (eventId) => {
    const eventToEdit = events.find((event) => event._id === eventId);

    if (eventToEdit) {
      setEditEventId(eventId);
      setEditedEvent({ ...eventToEdit });
    }
  };

  const handleCancelEdit = () => {
    setEditEventId(null);
    setEditedEvent({
      name: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      category: '',
    });
  };

  const handleViewRegisteredPlayers = (eventId) => {
    setSelectedEventId(eventId); // Update selectedEventId when the button is clicked
  };

  const dateFormat = 'YYYY-MM-DD';

  useEffect(() => {
    // Fetch events from the backend
    fetch('http://localhost:3000/get-events')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.error(error));
  }, []);

  function formatDate(dateString) {
    try {
      if (dateString && dateString.$date) {
        const date = new Date(dateString.$date);
        if (isNaN(date.getTime())) {
          return `Invalid Date Format: ${dateString.$date}`;
        }
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      }
      return `Invalid Date Format: ${dateString}`;
    } catch (error) {
      return `Date Parsing Error: ${error.message}, Input: ${dateString}`;
    }
  }
  

  return (
    <div className="app">
      <Cside />
      <div className="app-main">
        <Header />
        <Page title="Events" style={{fontFamily: "Footlight MT Light"}}>
          <div className="event-container">
            {events.map((event) => (
              <div className="event-box" key={event._id}>
                <div className="event-details">
                  {editEventId === event._id ? (
                    <>
                      <h3>
                        <input
                          type="text"
                          name="name"
                          value={editedEvent.name}
                          onChange={handleEditInputChange}
                        />
                      </h3>
                      <p>
                        Date:{' '}
                        <input
                          type="date"
                          name="date"
                          value={editedEvent.date}
                          onChange={handleEditInputChange}
                        />
                      </p>
                      <p>
                        Start Time:{' '}
                        <input
                          type="time"
                          name="startTime"
                          value={editedEvent.startTime}
                          onChange={handleEditInputChange}
                        />
                      </p>
                      <p>
                        End Time:{' '}
                        <input
                          type="time"
                          name="endTime"
                          value={editedEvent.endTime}
                          onChange={handleEditInputChange}
                        />
                      </p>
                      <p>
                        Location:{' '}
                        <input
                          type="text"
                          name="location"
                          value={editedEvent.location}
                          onChange={handleEditInputChange}
                        />
                      </p>
                      <p>
                        Age category:{' '}
                        <input
                          type="text"
                          name="category"
                          value={editedEvent.category}
                          onChange={handleEditInputChange}
                        />
                      </p>
                      <button onClick={handleEditEvent}>Save</button>&emsp;
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <h3>{event.name}</h3>
                      <p>Date: {formatDate(event.date)}</p>
                      <p>Start Time: {event.startTime}</p>
                      <p>End Time: {event.endTime}</p>
                      <p>Location: {event.location}</p>
                      <p>Age category: {event.category}</p>
                      <br></br>
                      <button onClick={() => handleEditClick(event._id)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button><br></br>
                      <button onClick={() => handleViewRegisteredPlayers(event._id) }>
                        View Registered Players
                      </button>
                    </>
                  )}
                </div>
                {selectedEventId === event._id && (
                  <EventList eventId={event._id}onClose={handleCloseDetails} />
                )}
              </div>
            ))}
             {showForm && (
              <div className="event-box">
                <form className='eventform'>
                  <input
                    type="text"
                    name="name"
                    placeholder="Event Name"
                    value={newEvent.name}
                    onChange={handleInputChange}
                  /><br /><br />
                  <p> Date:
                    <input
                      type="date"
                      name="date"
                      value={newEvent.date}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p> Start Time:
                    <input
                      type="time"
                      name="startTime"
                      value={newEvent.startTime}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p> End Time:
                    <input
                      type="time"
                      name="endTime"
                      value={newEvent.endTime}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p> Location:
                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={newEvent.location}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>Age category:
                    <input
                      type="text"
                      name="category"
                      placeholder="Age Category"
                      value={newEvent.category}
                      onChange={handleInputChange}
                    />
                  </p>

                  {(!newEvent.name || !newEvent.date || !newEvent.startTime || !newEvent.endTime || !newEvent.location || !newEvent.category) && (
                    <p className="validation-error">Please fill in all the required fields.</p>
                  )}

                  <button type="button" onClick={handleAddEvent}  disabled={!newEvent.name || !newEvent.date || !newEvent.startTime || !newEvent.endTime || !newEvent.location || !newEvent.category}>
                    Add Event
                  </button>
                </form>
              </div>
            )}

            {!showForm && (
              <div className="event-box add-event-button">
                <FontAwesomeIcon
                  icon={faPlus}
                  size="2x"
                  onClick={() => setShowForm(true)}
                />
              </div>
            )}
          </div>
        </Page>
      </div>
    </div>
  );
}

export default Cevents;
