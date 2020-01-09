import './GoogleAuth.css';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { Row, Col } from 'react-bootstrap';

import Google from '../../../img/google/google2x.png';
import Goog from '../../../img/google/goog2x.png';
// import { GOOGLE_SIGN_IN } from '../../../actions/types';
import { signIn, logout, createGoogleUser } from '../../../actions/profile';

const GoogleAuth = ({ authReducer, signIn, logout, createGoogleUser }) => {
  const responseGoogle = response => {
    const res = response;
    const values = {
      email: res.profileObj.email,
      givenName: res.profileObj.givenName,
      familyName: res.profileObj.familyName
    };
    createGoogleUser(values);
    console.log(values);
    signIn(res);
  };

  //   const logoutRes = () => {
  //       logout();
  //   }

  //   useEffect(() => {
  //     //   responseGoogle();
  //     console.log(authReducer);
  //   })

  //   console.log(authReducer);

  return (
    <div>
      <GoogleLogin
        clientId='1093539628095-vcrooulbub3vppi5mc0bglp5gkb41o95.apps.googleusercontent.com'
        buttonText='Login'
        render={renderProps => (
          <Fragment>
            {/* <h2 className='text-center mt-3'>Or Sign in with Google</h2> */}
            <Row className='my-3'>
              <Col className='col-8 col-lg-4  mx-auto text-center'>
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className='btn primary'
                >
                  <Row className='g-sign-in-row my-1'>
                    <Col className='g-icon-col col-lg-4'>
                      <div className='google-icon'>
                        <img
                          src={Google}
                          alt='google icon'
                          style={{ width: '35%', height: 'auto' }}
                        />
                      </div>
                    </Col>
                    <Col className='g-name-col mr-3 col-lg-4'>
                      <div className='google-name mr-3'>
                        <img
                          src={Goog}
                          alt='google name'
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                    </Col>
                  </Row>
                </button>
              </Col>
            </Row>
          </Fragment>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      {/* <GoogleLogout
                clientId="1093539628095-vcrooulbub3vppi5mc0bglp5gkb41o95.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logoutRes}
                >
            </GoogleLogout> */}
    </div>
  );
};

const mapStateToProps = state => ({
  authReducer: state.authReducer
});

export default connect(mapStateToProps, { signIn, logout, createGoogleUser })(
  GoogleAuth
);
