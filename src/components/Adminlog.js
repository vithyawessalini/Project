import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import adminData from '../json/admins';
import Swal from 'sweetalert2';
const Adminlog = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire('Please fill in all fields', '', 'error');
      return;
    }
    const user = adminData.find((user) => user.username === username);

    if (user && user.password === password) {
      localStorage.setItem('token', user.id); // Store the user ID as a token
      Swal.fire('Logged in Successfully', '', 'success');
      navigate('/ahome');
    } else {
      Swal.fire('Invalid username or password', '', 'error');
    }
  };

  const containerStyle1 = {
    backgroundColor: '#9a616d',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cardStyle1 = {
    borderRadius: '1rem',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  };

  const imageStyle1 = {
    height: '530px',
    width: '500px',
    borderRadius: '1rem 0 0 1rem',
    
  };

  const formStyle1 = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4rem 2rem',
    color: 'black',
  };
  
  const boxStyle1 = {
    border: '1px solid #ccc',
    borderRadius: '1rem',
    padding: '2rem',
    backgroundColor: 'white',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
    width:'900px',
    height:'500px'
  };

  const inputStyle1 = {
    marginBottom: '1rem',
    width: '73%',
    padding: '1rem',
    fontSize: '1rem',
    border: '1px solid black',
    borderRadius: '0.25rem',
  };
  
  const buttonStyle1 = {
    width: '80%',
    padding: '1rem',
    fontSize: '1rem',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '0.25rem',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle1}> <div style={boxStyle1}>
      <div className="card" style={cardStyle1}>
        <div className="col-md-6 col-lg-7 d-none d-md-block">
          <img
            src="https://img.freepik.com/free-vector/sport-equipment-concept_1284-13034.jpg"
            alt="login form"
            className="img-fluid"
            style={imageStyle1}
          />
        </div>
        <div className="col-md-7 col-lg-5 d-flex align-items-center">
          <div style={formStyle1}>
            <form onSubmit={handleLogin} className='signin'>
              <br></br><br></br><br></br><br></br>
              <div className="form-outline mb-4 custom-input">
                <input
                  type="text"
                  id="input1"
                  name="input1"
                  style={inputStyle1}
                  required
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />&emsp;
              </div>
              <div className="form-outline mb-4 custom-input">
                <input
                  type="password"
                  id="input2"
                  name="input2"
                  style={inputStyle1}
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />&emsp;
              </div>

              <div className="pt-1 mb-4">
                <button style={buttonStyle1} type="submit">
                  Login
                </button>
              </div>
              <div>
              Doesn't have an account ?
                <Link to="/signup" style={{ textDecoration: 'none', color: 'crimson' }}>
                  &emsp;Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div></div>
  );
};

export default Adminlog;
