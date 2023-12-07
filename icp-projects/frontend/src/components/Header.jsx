import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [selectedOption, setSelectedOption] = useState('login'); // 'login' or 'register'
  const [selectedName, setSelectedName] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  }
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const toggleLogin = () => {
    setLoginOpen(!isLoginOpen);
  };

  const Login = (e) => {
    e.preventDefault();
    // Perform login logic, set user data in local storage for example
    const userData = {
      role: document.getElementById('loginRole').value, // Get the selected role
    };

    // Additional login logic as needed

    // For demonstration purposes, log user data to the console
    alert('Success! logged in:');
    setLoginOpen(false);
  };
  const Logout = (e) => {
    e.preventDefault();

    localStorage.removeItem('user');
    navigate('/');
  };

  const Register = (e) => {
    e.preventDefault();
    // Perform registration logic, set user data in local storage for example
    const userData = {
      name: selectedName,
      email: selectedEmail,
      role: document.getElementById('registerRole').value, // Get the selected role
    };


    // Additional registration logic as needed

    // For demonstration purposes, log user data to the console
    alert('registered Successfully');
    setLoginOpen(false);
  };

  return (
    <>
      <div className='header'>
        <nav>
          <div className='logo'>

            <h2>Agrinsurance</h2>
          </div>
          <div className='links'>

            {/* {user && ( */}
            <div className='middle-links'>
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                {((user && user.role == "farmer") || (user && user.role == "admin")) && (
                  <li>
                    <Link to='/claims'>Claims</Link>
                  </li>
                )}
                {user && (
                  <li>
                    <Link to='/orders'>Orders</Link>
                  </li>
                )}


              </ul>
            </div>
            {/* )} */}
            <div className='auth-links'>
              <ul>

                {user ? (
                  <li className='logout'>
                      <button style={{ cursor: 'pointer', color: '#ffff' }} onClick={Logout}>Log Out</button>
                  </li>
                ) : (
                  <li className='logout'>
                    <button style={{ cursor: 'pointer', color: '#ffff' }} onClick={toggleLogin} >Register/Login</button>
                  </li>
                )}

              </ul>
            </div>
          </div>
          <div className="menu-bar" onClick={toggleMobileMenu}>
            <button style={{ cursor: 'pointer', color: '#ffff' }} ><i class="fa-solid fa-bars"></i></button>
          </div>
          {isMobileMenuOpen && (
            <div className='mobile-menu' onClick={toggleMobileMenu}>

              {/* {user && ( */}
              <div className='mobile-middle-links'>
                <ul>
                  <li>
                    <Link to='/'>Home</Link>
                  </li>
                  {((user && user.role == "farmer") || (user && user.role == "admin")) && (
                    <li>
                      <Link to='/claims'>Claims</Link>
                    </li>
                  )}
                 {user && (
                  <li>
                    <Link to='/orders'>Orders</Link>
                  </li>
                 )}

                </ul>
              </div>
              {/* )} */}
              <div className='mobile-auth-links'>
                <ul>

                  {user ? (
                    <li className='logout'>
                        <button style={{ cursor: 'pointer', color: '#ffff' }} onClick={Logout}>Log Out</button>
                    </li>
                  ) : (
                    <li className='logout'>
                      <button style={{ cursor: 'pointer', color: '#ffff' }} onClick={toggleLogin}>Register/Login</button>
                    </li>
                  )}

                </ul>
              </div>
            </div>
          )}
          {isLoginOpen && (
            <div className='login-menu'>

              {/* {user && ( */}
              <div className="log-in-container">
                <form action="">
                  <div className='form-group'>
                    <label htmlFor="">Login / Register</label>
                  </div>
                  <div className="form-group">
                    <label className="radio">
                      <input
                        type="radio"
                        value="login"
                        checked={selectedOption === 'login'}
                        onChange={handleRadioChange}
                      />
                      Login
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        value="register"
                        checked={selectedOption === 'register'}
                        onChange={handleRadioChange}
                      />
                      Register
                    </label>
                  </div>

                  <div className="form-group">


                    {selectedOption === 'login' && (
                      <>
                        <label htmlFor="">Login As a</label>
                        <select id="loginRole" className="form-control">
                          <option value="consumer">Consumer</option>
                          <option value="farmer">Farmer</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button className="form-control" style={{ border: '1px #fff', cursor: 'pointer' }} onClick={(e) => Login(e)}>Login</button>
                      </>
                    )}
                    {selectedOption === 'register' && (
                      <>
                        <label htmlFor="">Register As a</label>
                        <select id="registerRole" className="form-control">
                          <option value="consumer">Consumer</option>
                          <option value="farmer">Farmer</option>
                        </select>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your Name"
                          onChange={(e) => setSelectedName(e.target.value)}
                        />
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Your Email"
                          onChange={(e) => setSelectedEmail(e.target.value)}
                        />
                        <button
                          className="form-control"
                          style={{ border: '1px solid #fff', cursor: 'pointer' }}
                          onClick={(e) => Register(e)}
                        >
                          Register
                        </button>

                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}

export default Header;
