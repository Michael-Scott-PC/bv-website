import './Navbar.css';
import skyline from '../../img/navbar/ds_3x.png';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';

import AuthModal from '../forms/auth/AuthModal';
import { logout } from '../../actions/profile';
// import history from '../../history';

const Navbar = ({
  toggle,
  authReducer: { loading, user, googleUser },
  logout
}) => {
  const logoutRes = () => {
    logout();
  };

  const renderAuthenticatedNav = () => {
    console.log('renderAuthenticatedNav ran - line 14.');
    if (user.jwt) {
      return (
        <Fragment>
          <a href='#!' className='dropdown-item pt-4'>
            Welcome, {user.user.first_name}
          </a>
          <a href='#!' className='dropdown-item pt-4' onClick={() => logout()}>
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

  const check = () => {
    console.log(loading);
    console.log(user);
    console.log(googleUser);
  };

  // useEffect(() => {
  //   check();
  // })

  const [bar1, setBar1] = useState(false);
  const [bar2, setBar2] = useState(false);
  const [bar3, setBar3] = useState(false);

  toggle = () => {
    bar1 ? setBar1(false) : setBar1(true);
    bar2 ? setBar2(false) : setBar2(true);
    bar3 ? setBar3(false) : setBar3(true);
  };

  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <Fragment>
      <nav className='navbar navbar-expand-sm sticky-top'>
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
      <div className='collapse sticky-top' id='navbarToggleExternalContent'>
        <Link to='/' className='dropdown-item pt-4'>
          Home
        </Link>
        <Link to='/listings' className='dropdown-item pt-4'>
          Listings
        </Link>
        <Link to='/news-events' className='dropdown-item pt-4'>
          News &amp; Events
        </Link>
        <Link to='/contacts' className='dropdown-item pt-4'>
          Contact
        </Link>
        {!user.jwt && !googleUser.profileObj ? (
          <a
            href='#!'
            className='dropdown-item pt-4'
            onClick={() => setShowAuthModal(true)}
          >
            Sign In or Join
          </a>
        ) : (
          renderAuthenticatedNav()
        )}
        {!user.jwt && !googleUser.profileObj ? (
          <AuthModal
            onEnter={check}
            show={showAuthModal}
            onHide={() => setShowAuthModal(false)}
          />
        ) : (
          <AuthModal
            onEnter={check}
            show={!showAuthModal}
            // onHide={() => setShowAuthModal(false)}
          />
        )}
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
