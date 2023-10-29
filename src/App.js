import React from 'react';
import './style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Events from './pages/Events';
import Dash from './pages/Dash';
import Adash from './pages/Adash';
import Cdash from './pages/Cdash';
import Teams from './pages/Teams';
import Players from './pages/Player';
import Aplayers from './pages/Aplayers';
import Eventlist from './components/EventList';
import Playerdetails from './components/Playerdetails';
import Playerlist from './components/Playerlist';
import Adminlog from './components/Adminlog';
import Coachlog from './components/Coachlog';
import Playerlog from './components/Playerlogin';
import Contact from './components/Contact';
import Signup from './components/Signup';
import Flogin from './components/Flogin';
import AddPlayerForm from './components/AddPlayerForm';
import Coachdash from './pages/Coachdash';
import Fhome from './pages/Fhome';
import Fcoach from './pages/Fcoach';
import Acoach from './pages/Acoach';
import Fteam from './pages/Fteam';
import Fabout from './pages/Fabout';
import Fcont from './pages/Fcont';
import Calender from './pages/Calender';
import Pcalender from './pages/Pcalender';
import Acalender from './pages/Acalender';
import Cside from './components/Cside';
import Aside from './components/Aside';
import Cplayer from './pages/Cplayers';
import Chome from './pages/Chome';
import Cevents from './pages/Cevents';
import Cteams from './pages/Cteams';
import Ahome from './pages/Ahome';
import Aevents from './pages/Aevent';
import Ateams from './pages/Ateam';
import Profile from './pages/Profile';
import Practise from './pages/Practise';
import Apractise from './pages/Apractise';
import Ppractise from './pages/Ppractise';
import Psign from './components/Psign';
import Csign from './components/Csign';
import EventRegistrationForm from './components/EventRegistrationForm';
import VideoGallery from './components/Vgallery';
const player1 = {
  name: 'Player 1',
  id: '1',
  position: 'Forward',
  class:'IX',
  gameswon:'3',
  gamesparticipated:'8',
  team:'Football',
  profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&usqp=CAU', // Replace with the actual URL
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile playerData={player1} />} />

      
        <Route path="/home" element={<Home />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="/adash" element={<Adash />} />
        <Route path="/cdash" element={<Cdash />} />
        <Route path="/events" element={<Events />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/players" element={<Players />} />
        <Route path="/aplayers" element={<Aplayers />} />
        <Route path="/playerlist" element={<Playerlist />} />
        <Route path="/playerdetails" element={<Playerdetails />} />
        <Route path="/eventlist" element={<Eventlist />} />
        <Route path="/adminlog" element={<Adminlog />} />
        <Route path="/Coachlog" element={<Coachlog />} />
        <Route path="/playerlog" element={<Playerlog/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/psign" element={<Psign />} />
        <Route path="/csign" element={<Csign/>} />
        <Route path="/flogin" element={<Flogin />} />
        <Route path="/addplayerform" element={<AddPlayerForm />} />
        <Route path="/coachdash" element={<Coachdash />} />
        <Route path="/" element={<Fhome  />} />
        <Route path="/fabout" element={<Fabout />} />
        <Route path="/fteam" element={<Fteam />} />
        <Route path="/fcoach" element={<Fcoach />} />
        <Route path="/acoach" element={<Acoach />} />
        <Route path="/fcont" element={<Fcont />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/pcalender" element={<Pcalender />} />
        <Route path="/acalender" element={<Acalender />} />
        <Route path="/cside" element={<Cside />} />
        <Route path="/aside" element={<Aside />} />
        <Route path="/cplayer" element={<Cplayer />} />
        <Route path="/chome" element={<Chome />} />
        <Route path="/cevents" element={<Cevents />} />
        <Route path="/cteams" element={<Cteams />} />
        <Route path="/aevents" element={<Aevents />} />
        <Route path="/ateams" element={<Ateams />} />
        <Route path="/ahome" element={<Ahome />} />
        <Route path="/practise" element={<Practise />} />
        <Route path="/apractise" element={<Apractise />} />
        <Route path="/ppractise" element={<Ppractise />} />
        <Route path="/eventform" element={<EventRegistrationForm />} />
        <Route path="vgallery" element={<VideoGallery/>}/>
      </Routes>
    </Router>
  );
}

export default App;
