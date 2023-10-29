import React, { useState, useEffect } from 'react';
import Page from '../components/Page'; 
import Sidebar from '../components/Aside';
import Header from '../components/Header';
import axios from 'axios';

const Dash = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(0);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [numberOfTeams, setNumberOfTeams] = useState(0);

  useEffect(() => {
    // Make API requests to get counts
    axios.get('/get-events')
      .then((response) => {
        setNumberOfEvents(response.data.length);
      })
      .catch((error) => {
        console.error('Error fetching event count:', error);
      });

    axios.get('/playerslist')
      .then((response) => {
        setNumberOfPlayers(response.data.length);
      })
      .catch((error) => {
        console.error('Error fetching player count:', error);
      });

    axios
    .get('/get-teams') // Assuming you have an endpoint to fetch teams
    .then((response) => {
      setNumberOfTeams(response.data.length); // Count the unique teams
    })
    .catch((error) => {
      console.error('Error fetching team count:', error);
    });
}, []);

  return (
    <div className="app">
      <Sidebar />
      <div className="app-main">
        <Header />
        <Page title="Dashboard" style={{fontFamily: "Footlight MT Light"}}>
          <br></br>
          <div className="dashboard">
            <div className="dashboard-box">
              <h2>Number of Events</h2>
              <p>9</p>
            </div>
            <div className="dashboard-box">
              <h2>Number of Players</h2>
              <p>54</p>
            </div>
            <div className="dashboard-box">
              <h2>Number of Teams</h2>
              <p>8</p>
            </div>
          </div>
        </Page>
      </div>
    </div>
  );
};

export default Dash;
