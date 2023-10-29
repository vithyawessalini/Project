import React, { useState, useEffect } from 'react';
import registeredPlayersData from '../json/registeredplayers'; 
function EventList({ eventId, onClose }) {
  const [registeredPlayers, setRegisteredPlayers] = useState([]);

  useEffect(() => {
    // Filter registered players based on the eventId prop
    const filteredPlayers = registeredPlayersData.filter((player) => player.eventId.$oid === eventId.$oid);

    setRegisteredPlayers(filteredPlayers);
  }, [eventId]);

  return (
    <div>
      
      <div className="player-details-container">
        <div className="player-register">
          <p className="close-button" onClick={onClose}>
            <img src="https://cdn-icons-png.flaticon.com/128/2961/2961937.png" alt='close' className='close' />
          </p>
          <h2 style={{fontFamily: "Footlight MT Light"}}>Registered Players</h2>
          {registeredPlayers.map((player, index) => (
            <ul>
            <li key={player._id}>
              {index + 1}. <strong>Player ID:</strong>{player.id}<br></br>
              &emsp;<strong>Player name:</strong>{player.name}<br></br>
            </li></ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventList;
