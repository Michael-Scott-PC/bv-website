import './Footer.css';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { getBrianInfo } from '../../actions/realtor';
import PropTypes from 'prop-types';

const Footer = ({ getBrianInfo, brian: { brian } }) => {
  useEffect(() => {
    getBrianInfo();
  }, [getBrianInfo]);

  const {
    facebook,
    instagram,
    linkedin,
    twitter,
    email,
    cell,
    office_phone
  } = brian;

  return (
    <Fragment>
      <footer className='footer'>
        <div className='foot container-fluid pt-3'>
          <div className='row text-center mb-1'>
            <div className='col-sm-12 mt-4'>
              {linkedin && (
                <a href={`${linkedin}`} alt='linkedin icon'>
                  <i className='fab fa-linkedin-in mr-3'></i>
                </a>
              )}
              {facebook && (
                <a href={`${facebook}`} alt='facebook icon'>
                  <i className='fab fa-facebook-f mr-3'></i>
                </a>
              )}
              {twitter && (
                <a href={`${twitter}`} alt='twitter icon'>
                  <i className='fab fa-twitter mr-3'></i>
                </a>
              )}
              {instagram && (
                <a href={`${instagram}`} alt='instagram icon'>
                  <i className='fab fa-instagram'></i>
                </a>
              )}
            </div>
          </div>
          {email && (
            <div className='row py-1'>
              <div className='col-sm-12'>
                <a
                  href={`mailto:${email}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <p className='text-center mb-1 contact-info'>
                    <i className='fas fa-envelope mr-2'></i>
                    {email}
                  </p>
                </a>
              </div>
            </div>
          )}
          {office_phone && (
            <div className='row py-1'>
              <div className='col-sm-12'>
                <a
                  href={`tel:${office_phone}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <p className='text-center mb-1 contact-info'>
                    <i className='fas fa-phone mr-2'></i>Office: {office_phone}
                  </p>
                </a>
              </div>
            </div>
          )}
          {cell && (
            <div className='row '>
              <div className='col-sm-12'>
                <a
                  href={`tel:${cell}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <p className='text-center contact-info'>
                    <i className='fas fa-mobile-alt mr-2'></i>Cell: {cell}
                  </p>
                </a>
              </div>
            </div>
          )}
        </div>
      </footer>
    </Fragment>
  );
};

Footer.propTypes = {
  getBrianInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  brian: state.realtorReducer
});

export default connect(mapStateToProps, { getBrianInfo })(Footer);
