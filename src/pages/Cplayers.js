import React, { useState, useEffect, useRef } from 'react';
import PlayerList from '../components/Playerlist';
import PlayerDetails from '../components/Playerdetails';
import Page from '../components/Page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import the delete icon
import AddPlayerForm from '../components/AddPlayerForm';
import Sidebar from '../components/Cside';
import Header from '../components/Header';
import playersData from '../json/players'; 
function Cplayer() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [playerId, setPlayerId] = useState(203);
  const [players, setPlayers] = useState(playersData); // Initialize players with the imported data
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [playerToDeleteId, setPlayerToDeleteId] = useState('');
  const [isDeleteAlertVisible, setIsDeleteAlertVisible] = useState(false);
  const [deleteAlertMessage, setDeleteAlertMessage] = useState('');

  useEffect(() => {
    // Fetch the list of players from your server
    fetch('/playerslist')
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error(error));
  }, []);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleAddPlayer = (newPlayer) => {
    setPlayers([...players, newPlayer]);
    setIsAddingPlayer(false);
  };
  const handleCloseAddPlayerForm = () => {
    setIsAddingPlayer(false);
  };

  const handleDeleteButtonClick = () => {
    setDeletePopupOpen(true);
  };

  const handleCloseDeletePopup = () => {
    setDeletePopupOpen(false);
    setPlayerToDeleteId('');
  };

  useEffect(() => {
    // Hide the alert after a few seconds (adjust the timeout as needed)
    if (isDeleteAlertVisible) {
      const timeoutId = setTimeout(() => {
        setIsDeleteAlertVisible(false);
        setDeleteAlertMessage('');
      }, 3000); // 3 seconds
      return () => clearTimeout(timeoutId);
    }
  }, [isDeleteAlertVisible]);

  const handleDeleteConfirm = () => {
    // Send a DELETE request to your server with playerToDeleteId
    fetch(`/deletePlayer/${playerToDeleteId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the players list after deletion
        setPlayers(players.filter((player) => player.id !== playerToDeleteId));
        setDeletePopupOpen(false);
        setPlayerToDeleteId('');

        // Set the delete alert message and make it visible
        setDeleteAlertMessage('Player deleted successfully');
        setIsDeleteAlertVisible(true);
      })
      .catch((error) => console.error(error));
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleCloseAddPlayerForm();
      }
    };

    if (isAddingPlayer) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isAddingPlayer]);

  return (
    <div className="app">
      <Sidebar />
      <div className="app-main">
        <Header />
        <div>
          <Page title="Players list" />
          <PlayerList players={players} onRowClick={handlePlayerClick} selectedPlayer={selectedPlayer} />
          {selectedPlayer && <PlayerDetails player={selectedPlayer} />}
          <div className="button-group">
            <div className="add-player-icon" onClick={() => setIsAddingPlayer(true)}>
              <FontAwesomeIcon icon={faPlus} className="icon1" />
            </div>
            <div className="delete-player-icon" onClick={handleDeleteButtonClick}>
              <FontAwesomeIcon icon={faTrash} className="icon" />
            </div>
          </div>
          <br />

          {isAddingPlayer && (
            <div className="modal-overlay" ref={modalRef}>
              <AddPlayerForm onAddPlayer={handleAddPlayer} playerId={playerId} onClose={handleCloseAddPlayerForm} />
            </div>
          )}
        </div>
        {deletePopupOpen && (
          <div className="modal-overlay">
            <div className="delete-popup">
              <p>Enter the Player ID to delete:</p>
              <input
                type="text"
                value={playerToDeleteId}
                onChange={(e) => setPlayerToDeleteId(e.target.value)}
              />
              <button onClick={handleDeleteConfirm}>Delete</button><br/>
              <button onClick={handleCloseDeletePopup}>Cancel</button>
            </div>
          </div>
        )}
        {isDeleteAlertVisible && (
          <div className="alert alert-success" role="alert">
            {deleteAlertMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cplayer;
