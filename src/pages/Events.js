import React, { useState, useEffect } from 'react';
import Page from '../components/Page';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import EventRegistrationForm from '../components/EventRegistrationForm'; // Import the registration form
import eventsData from '../json/events'; // Make sure the path to your JSON file is correct

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

function Event() {
  const [events, setEvents] = useState(eventsData);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

 
  const handleRegistrationSubmit = (registrationData) => {
    // Handle registration submission here (e.g., send data to the backend)
    // You can use the registrationData object to send the user's registration data
    console.log('Registration Data:', registrationData);

    // Clear the selected event and close the form
    setSelectedEvent(null);
    setShowRegistrationForm(false);
  };

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setShowRegistrationForm(true);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="app-main">
        <Header />
        <Page title="Events">
          <div className="event-container">
            {events.map((event) => (
              <div className="event-box" key={event.id}>
                <div className="event-details">
                  <h3>{event.name}</h3>
                  <p>Date: {formatDate(event.date)}</p>
                  <p>Start Time: {event.startTime}</p>
                  <p>End Time: {event.endTime}</p>
                  <p>Location: {event.location}</p>
                  <p>Age category: {event.category}</p>
                  <button onClick={() => handleRegisterClick(event)}>Register</button>
                  
                </div>
              </div>
            ))}
            
          </div>
        </Page>

        {/* Display the registration form at the bottom of the page */}
        {showRegistrationForm && (
          <EventRegistrationForm
            event={selectedEvent}
            onClose={() => setShowRegistrationForm(false)}
            onSubmit={handleRegistrationSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default Event;