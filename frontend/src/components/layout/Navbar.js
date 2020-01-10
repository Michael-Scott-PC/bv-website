import './Navbar.css';
import skyline from '../../img/navbar/ds_3x.png';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';

import AuthModal from '../forms/auth/AuthModal';
import { logout } from '../../actions/profile';
import authReducer from '../../reducers/authReducer';

const Navbar = ({ authReducer: { loading, user, googleUser }, logout }) => {
  console.log(user);
  console.log(user.first_name);
  const [bar1, setBar1] = useState(false);
  const [bar2, setBar2] = useState(false);
  const [bar3, setBar3] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggle = () => {
    bar1 ? setBar1(false) : setBar1(true);
    bar2 ? setBar2(false) : setBar2(true);
    bar3 ? setBar3(false) : setBar3(true);
  };

  const closeHamburger = () => {
    document
      .getElementById('navbarToggleExternalContent')
      .classList.remove('show');
    toggle();
  };

  const logoutRes = () => {
    closeHamburger();
    logout();
  };

  const renderAuthenticatedNav = () => {
    if (user && user.confirmed) {
      return (
        <Fragment>
          <a href='#!' className='dropdown-item pt-4'>
            Welcome, {user.first_name}
          </a>
          <a href='#!' className='dropdown-item pt-4' onClick={logoutRes}>
            Sign Out
          </a>
        </Fragment>
      );
    }
    if (googleUser.profileObj) {
      return (
        <Fragment>
          <a href='#!' className='dropdown-item pt-4'>
            Welcome, {googleUser.profileObj.givenName}
          </a>
          <GoogleLogout
            clientId='1093539628095-vcrooulbub3vppi5mc0bglp5gkb41o95.apps.googleusercontent.com'
            buttonText='Logout'
            onLogoutSuccess={logoutRes}
            className='google-logout'
          ></GoogleLogout>
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      <nav className='navbar navbar-expand-lg sticky-top'>
        <button
          onClick={toggle}
          id='navbar-toggler'
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarToggleExternalContent'
          aria-controls='navbarToggleExternalContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <div
            className={
              !bar1 ? 'navbar-toggler-line1' : 'navbar-toggler-line1 one'
            }
          ></div>
          <div
            className={
              !bar2 ? 'navbar-toggler-line2' : 'navbar-toggler-line2 two'
            }
          ></div>
          <div
            className={
              !bar3 ? 'navbar-toggler-line3' : 'navbar-toggler-line3 three'
            }
          ></div>
        </button>
        <img
          className='skyline mx-auto'
          src={skyline}
          alt='detroit skyline outline'
        />
      </nav>
      <div
        className='collapse sticky-top row row-collapse'
        id='navbarToggleExternalContent'
      >
        <div className='brian-name-container d-none d-lg-flex col-lg-2 px-0'>
          <h1 className='landscape-brian-name ml-5'>Brian Vasquez</h1>
        </div>
        <div className='link-container col-12 col-lg-10'>
          <Link to='/' className='dropdown-item' onClick={closeHamburger}>
            Home
          </Link>
          <Link
            to='/browse-listings'
            className='dropdown-item'
            onClick={closeHamburger}
          >
            Listings
          </Link>
          <Link
            to='/news-events'
            className='dropdown-item'
            onClick={closeHamburger}
          >
            News &amp; Events
          </Link>
          <Link
            to='/contacts'
            className='dropdown-item'
            onClick={closeHamburger}
          >
            Contact
          </Link>
          {!user.confirmed && !googleUser.profileObj ? (
            <a
              href='#!'
              className='dropdown-item'
              onClick={() => setShowAuthModal(true)}
            >
              <p onClick={closeHamburger} className='signin-link'>
                Sign In or Join
              </p>
            </a>
          ) : (
            renderAuthenticatedNav()
          )}

          {/* <AuthModal
            show={showAuthModal}
            onHide={() => setShowAuthModal(false)}
          /> */}

          {!user.confirmed && !googleUser.profileObj ? (
            <AuthModal
              show={showAuthModal}
              onHide={() => setShowAuthModal(false)}
            />
          ) : (
            <AuthModal show={false} />
          )}
        </div>
      </div>
    </Fragment>
  );
};

Navbar.propTypes = {
  authReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authReducer: state.authReducer
});

export default connect(mapStateToProps, { logout })(Navbar);
