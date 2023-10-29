import React from 'react';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import { useState ,useEffect} from 'react';
import playerData from '../json/players.json'
import register from '../json/registeredplayers.json';
function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // You can set the user based on your requirements. For example, you can select a user by ID.
    const selectedUser = playerData.find((player) => player.id === "5001");

    setUser(selectedUser);
  }, []);
  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',     
    paddingTop:'100px' ,
  };
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    // You can set the user based on your requirements. For example, you can select a user by ID.
    const selectedUser = playerData.find((player) => player.id === "5001");
    setUser(selectedUser);

    // Use the 'register' data directly for registered events
    setRegisteredEvents(register);
  }, []);
  return (
    <div className="app">
    <Sidebar />
    <div className="app-main">
      <Header />
      <div className="profile">
        <div className="profile-header">
          <div className="profile-info">
            {user && (
              <div>
                <br></br>
                <p className="profile-h" style={{ fontFamily: "Footlight MT Light" }}>
                  PROFILE
                </p>
                <br></br>
                <hr />
                <br></br>
                <p className="profile-other">
                  Name&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; {user.firstName}&emsp;{user.lastName}
                </p>
                <hr />
                <p className="profile-other">
                  ID&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; {user.id}
                </p>
                <hr />
                <p className="profile-other">
                  Sport&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; {user.sport}
                </p>
                <hr />
                <p className="profile-other">
                  Age&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.age}
                </p>
                <hr />
                <p className="profile-other">
                  Email&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; {user.email}
                </p>
                <hr />
                <p className="profile-other">
                  Contact number&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp; {user.contactNumber}
                </p>
                <hr />
                <p className="profile-other">
                  Team&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; {user.sport}
                </p>
                <hr />
                <p className="profile-other">
                  Position&emsp;&nbsp;&emsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; {user.position}
                </p>
                <hr></hr>
               <br/><br/>
                
              </div>
            )}
          </div>

          <div style={imageContainerStyle}>
            <img
              className="profile-picture"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&usqp=CAU"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default Profile;