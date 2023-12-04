import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
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
                <li>
                  <Link to='/claims'>Claims</Link>
                </li>
                <li>
                  <Link to='/orders'>Orders</Link>
                </li>

              </ul>
            </div>
            {/* )} */}
            <div className='auth-links'>
              <ul>

                {user ? (
                  <li className='logout'>
                    <Link to="https://identity.ic0.app/#authorize">
                      <button style={{ cursor: 'pointer', color: '#ffff' }} >Log Out</button>
                    </Link>
                  </li>
                ) : (
                  <li className='logout'>
                    <Link to="https://identity.ic0.app/">
                      <button style={{ cursor: 'pointer', color: '#ffff' }} >Register/Login</button>
                    </Link>
                  </li>
                )}

              </ul>
            </div>
          </div>
          <div className="menu-bar"  onClick={toggleMobileMenu}>
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
                  <li>
                    <Link to='/claims'>Claims</Link>
                  </li>
                  <li>
                    <Link to='/orders'>Orders</Link>
                  </li>

                </ul>
              </div>
              {/* )} */}
              <div className='mobile-auth-links'>
                <ul>

                  {user ? (
                    <li className='logout'>
                      <Link to="https://identity.ic0.app/#authorize">
                        <button style={{ cursor: 'pointer', color: '#ffff' }} >Log Out</button>
                      </Link>
                    </li>
                  ) : (
                    <li className='logout'>
                      <Link to="https://identity.ic0.app/">
                        <button style={{ cursor: 'pointer', color: '#ffff' }} >Register/Login</button>
                      </Link>
                    </li>
                  )}

                </ul>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}

export default Header;
