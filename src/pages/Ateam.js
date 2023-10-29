import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Cside from '../components/Aside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import teamData from '../json/team';

function Cteams() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newTeamId, setNewTeamId] = useState('');
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamCity, setNewTeamCity] = useState('');
  const [newTeamCaptain, setNewTeamCaptain] = useState('');
  const [newPlayerId, setNewPlayerId] = useState('');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerPosition, setNewPlayerPosition] = useState('');
  const [addingTeam, setAddingTeam] = useState(false);
  const [addingPlayer, setAddingPlayer] = useState(false);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [editedTeam, setEditedTeam] = useState({});
  const [teamsData, setTeamsData] = useState(teamData);
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState([]);

  useEffect(() => {
    // Fetch players grouped by teams and sports from the server
    // Replace this with your actual data fetching code
    // You can fetch data from an API or use the teamData imported from JSON
  }, []);

  const handleTeamSelect = (teamId) => {
    setSelectedTeam(teamId);

    const teamData = teamsData.find((teamData) => teamData.id === teamId);
    if (teamData) {
      setSelectedTeamPlayers(teamData.players);
    } else {
      setSelectedTeamPlayers([]);
    }
  };

  const handleAddTeamClick = () => {
    setAddingTeam(true);
  };

  const handleAddTeam = () => {
    if (newTeamName.trim() === '' || newTeamId.trim() === '') {
      return;
    }

    const newTeam = {
      id: newTeamId,
      name: newTeamName,
      city: newTeamCity,
      captain: newTeamCaptain,
      players: [],
    };

    setTeamsData([...teamsData, newTeam]);
    setNewTeamId('');
    setNewTeamName('');
    setNewTeamCity('');
    setNewTeamCaptain('');
    setSelectedTeam(newTeam.id);
    setAddingTeam(false);
  };

  const handleAddPlayerClick = () => {
    setAddingPlayer(true);
  };

  const handleAddPlayer = () => {
    if (newPlayerName.trim() === '' || newPlayerId.trim() === '' || newPlayerPosition.trim() === '') {
      return;
    }

    const updatedTeamsData = [...teamsData];
    const teamIndex = updatedTeamsData.findIndex((team) => team.id === selectedTeam);

    if (teamIndex !== -1) {
      updatedTeamsData[teamIndex].players.push({
        id: newPlayerId,
        username: newPlayerName,
        position: newPlayerPosition,
      });
    }

    setTeamsData(updatedTeamsData);
    setNewPlayerId('');
    setNewPlayerName('');
    setNewPlayerPosition('');
    setAddingPlayer(false);
  };

  const handleEditTeam = (team) => {
    setIsEditingTeam(true);
    setEditedTeam(team);
  };

  const handleSaveTeam = () => {
    const updatedTeamsData = teamsData.map((team) => {
      if (team.id === editedTeam.id) {
        return editedTeam;
      }
      return team;
    });

    setTeamsData(updatedTeamsData);
    setIsEditingTeam(false);
    setEditedTeam({});
  };

  const handleCancelEdit = () => {
    setIsEditingTeam(false);
    setEditedTeam({});
  };

  return (
    <div className="app">
      <Cside />
      <div className="app-main">
        <Header />
        <div>
          <h2>
            Teams{' '}
            <span
              className="plus-icon"
              onClick={handleAddTeamClick}
            >
              +
            </span>
          </h2>
          {addingTeam && (
            <div>
              <input
                type="text"
                placeholder="New Team ID"
                value={newTeamId}
                onChange={(e) => setNewTeamId(e.target.value)}
              />&emsp;
              <input
                type="text"
                placeholder="New Team Name"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
              />&emsp;
              <input
                type="text"
                placeholder="City"
                value={newTeamCity}
                onChange={(e) => setNewTeamCity(e.target.value)}
              />&emsp;
              <input
                type="text"
                placeholder="Captain"
                value={newTeamCaptain}
                onChange={(e) => setNewTeamCaptain(e.target.value)}
              />&emsp;
              <button onClick={handleAddTeam}>Add Team</button>
            </div>
          )}

          {teamsData.map((team) => (
            <li key={team.id} onClick={() => handleTeamSelect(team.id)}>
              {isEditingTeam && editedTeam.id === team.id ? (
                // Editing mode
                <>
                  <input
                    type="text"
                    placeholder="New Team ID"
                    value={editedTeam.id}
                    onChange={(e) => setEditedTeam({ ...editedTeam, id: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="New Team Name"
                    value={editedTeam.name}
                    onChange={(e) => setEditedTeam({ ...editedTeam, name: e.target.value })}
                  />
                  {/* ... Other inputs for editing ... */}
                  <button onClick={handleSaveTeam}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </>
              ) : (
                // Display mode
                <>
                  {team.sport}
                  <span onClick={() => handleEditTeam(team)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </span>
                </>
              )}
            </li>
          )
        )}

          {selectedTeam && (
            <div>
              <h3>
                Players of {teamsData.find((team) => team.id === selectedTeam)?.sport}
                <span className="plus-icon" onClick={handleAddPlayerClick}>
                  +
                </span>
              </h3>

              <p>Team ID: {teamsData.find((team) => team.id === selectedTeam)?.sport}</p>
              <p>City: {teamsData.find((team) => team.id === selectedTeam)?.city}</p>
              {selectedTeamPlayers.length > 0 && (
                <p>Captain: {selectedTeamPlayers[0].username}</p>
              )}


              <table className="player-table">
                <thead>
                  <tr>
                    <th className="player-id-header">Player ID</th>
                    <th>Player Name</th>
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTeamPlayers.map((player) => (
                    <tr key={player.id}>
                      <td>{player.id}</td>
                      <td>{player.username}</td>
                      <td>{player.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {addingPlayer && (
                <div>
                  <br></br>
                  <input
                    type="text"
                    placeholder="New Player ID"
                    value={newPlayerId}
                    onChange={(e) => setNewPlayerId(e.target.value)}
                  />&emsp;
                  <input
                    type="text"
                    placeholder="New Player Name"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                  />&emsp;
                  <input
                    type="text"
                    placeholder="Position"
                    value={newPlayerPosition}
                    onChange={(e) => setNewPlayerPosition(e.target.value)}
                  />&emsp;
                  <button onClick={handleAddPlayer}>Add Player</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cteams;
