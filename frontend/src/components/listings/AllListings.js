import './AllListings.css';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllListings } from '../../actions/listing';

import CustomPagination from './CustomPagination';

const AllListings = ({ getAllListings }) => {
  useEffect(() => {
    getAllListings();
  }, [getAllListings]);

  return (
    <Fragment>
      <div className='all-listings container py-5'>
        <h1 className='all-listings-header text-center my-5'>
          Browse Listings
        </h1>
        <div className='row justify-listings'>
          <CustomPagination />
        </div>
      </div>
    </Fragment>
  );
};

AllListings.propTypes = {
  getAllListings: PropTypes.func.isRequired,
  listingReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  listingReducer: state.listingReducer
});

export default connect(mapStateToProps, { getAllListings })(AllListings);
