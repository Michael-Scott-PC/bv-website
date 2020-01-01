import './Landing.css';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLandingImage } from '../../actions/landing';
import Spinner from '../spinner/Spinner';

const Landing = ({ getLandingImage, landing: { landing, loading } }) => {
  useEffect(() => {
    getLandingImage();
  }, [getLandingImage]);

  const renderLandingPhoto = () => {
    if (landing.publish) {
      if (landing.landing_photo) {
        const { url } = landing.landing_photo;
        return (
          <div className='container' style={{ height: '250px' }}>
            <div className='row' style={{ height: '250px', width: '100%' }}>
              <img
                className='landing img-fluid'
                // src={`https://localhost:1337${url}`}
                // alt={landing.description}
                style={{
                  background: `url(https://localhost:1337${url}) 0% 19%`,
                  backgroundAttachment: 'fixed',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  width: '100%'
                }}
              />
            </div>
          </div>
        );
      }
    }
  };

  return (
    <Fragment>
      {landing === null || loading ? <Spinner /> : renderLandingPhoto()}
    </Fragment>
  );
};

Landing.propTypes = {
  getLandingImage: PropTypes.func.isRequired,
  landing: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  landing: state.landingReducer
});

export default connect(mapStateToProps, { getLandingImage })(Landing);
