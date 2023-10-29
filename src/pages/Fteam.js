import React, { useState } from 'react';
import Fside from '../components/Fside';
import Fhead from '../components/Fhead';
import playerData from '../json/players'; // Import the players data

function Fteams() {
  const [selectedSport, setSelectedSport] = useState(null);

  // Get a list of unique sports from the player data
  const sports = [...new Set(playerData.map((player) => player.sport))];

  return (
    <div className="app">
      <Fside />
      <div className="app-main">
        <Fhead />
        <div className="teamd">
          <div className="teamdetails">
            <h1 style={{ fontFamily: "Footlight MT Light" }}>All Teams</h1>
            <div className="teams-container">
              <div className="teams-list">
                <div>
                  {sports.map((sport) => (
                    <div
                      key={sport}
                      onClick={() => setSelectedSport(sport)}
                      className="team-item"
                    >
                      {sport}
                    </div>
                  ))}
                </div>
              </div>
              <div className="selected-team">
                {selectedSport && (
                  <div>
                    <h3>Players in {selectedSport}</h3>
                    <ul>
                      {playerData
                        .filter((player) => player.sport === selectedSport)
                        .map((player) => (
                          <li key={player._id["$oid"]}>
                            {player.firstName} {player.lastName}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fteams;
