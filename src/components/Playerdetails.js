import React from 'react';

function Playerdetails({ player, onClose }) {
  return (
    <div className="player-details-container">
      <div className="player-details">
        <p className="close-button" onClick={onClose}>
          <img src="https://cdn-icons-png.flaticon.com/128/2961/2961937.png" alt="close" className="close" />
        </p>
        <h3 style={{ fontFamily: "Footlight MT Light" }}>Player Details</h3>
        <p>Name: {player.username}</p>
        <p>Age: {player.age}</p>
        <p>Sport: {player.sport}</p>
        <p>Position: {player.position}</p>
        <br />
      </div>
    </div>
  );
}

export default Playerdetails;
