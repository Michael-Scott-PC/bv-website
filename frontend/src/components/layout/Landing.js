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
          <img
            className='landing img-fluid'
            src={`${process.env.REACT_APP_STRAPIURL}${url}`}
            alt={landing.description}
          />
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
