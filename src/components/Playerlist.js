import React, { useState, useEffect } from 'react';
import PlayerDetails from './Playerdetails'; // Import the PlayerDetails component
import playersData from '../json/players'; // Import the JSON data

function Playerlist() {
  const [players, setPlayers] = useState(playersData); // Initialize players with the imported data
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    // Fetch the list of players from your API
    fetch('http://localhost:3000/playerslist') // Replace with your server's URL
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Add this line to log the fetched data
        setPlayers(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleRowClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleCloseDetails = () => {
    setSelectedPlayer(null);
  }
  const handlePlayerAdded = () => {
    // Refresh the list of players after a player is added
    fetch('http://localhost:5000/playerslist')
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <table className="player-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr
              key={player.id}
              onClick={() => handleRowClick(player)}
              className={selectedPlayer === player ? 'selected-row' : ''}
            >
              <td>{player.id}</td>
              <td>{player.username}</td> {/* Use username instead of name */}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPlayer && (
        <PlayerDetails player={selectedPlayer} onClose={handleCloseDetails} />
      )}
    </div>
  );
}

export default Playerlist;
