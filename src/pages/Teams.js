import React, { useState } from 'react';
import playerData from '../json/players'; // Import the players data
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
function Teams() {
  const [selectedSport, setSelectedSport] = useState(null);

  const sports = [...new Set(playerData.map((player) => player.sport))];

  const handleTeamSelect = (sport) => {
    setSelectedSport(sport);
  };

  return (
    <div className="app"><Sidebar />
      <div className="app-main"><Header />
        <h2 style={{ fontFamily: "Footlight MT Light" }}>Teams</h2>
        <ul>
          {sports.map((sport) => (
            <li key={sport} onClick={() => handleTeamSelect(sport)}>
              {sport}
            </li>
          ))}
        </ul>
        {selectedSport && (
          <div>
            <h3>Players of {selectedSport}</h3>
            <table className="player-table">
              <thead>
                <tr>
                  <th className="player-id-header">Player ID</th>
                  <th>Player Name</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {playerData
                  .filter((player) => player.sport === selectedSport)
                  .map((player) => (
                    <tr key={player._id}>
                      <td>{player.id}</td>
                      <td>{player.firstName} {player.lastName}</td>
                      <td>{player.position}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
