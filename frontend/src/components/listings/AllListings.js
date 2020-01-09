import './AllListings.css';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllListings } from '../../actions/listing';

import Listing from './Listing';
import Spinner from '../spinner/Spinner';

const AllListings = ({
  getAllListings,
  listingReducer: { allListings, loading }
}) => {
  useEffect(() => {
    getAllListings();
  }, [getAllListings]);

  console.log(allListings);

  return (
    <Fragment>
      <div className='all-listings container py-5'>
        <h1 className='all-listings-header text-center my-5'>
          Browse Listings
        </h1>
        <div className='row justify-listings'>
          {allListings.length === 0 || loading ? (
            <Spinner />
          ) : (
            allListings.map(listing => (
              <div key={listing.id} className='col-md-6 col-lg-4 mb-5'>
                <Listing listing={listing} />
              </div>
            ))
          )}
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
