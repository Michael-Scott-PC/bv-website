import './FeaturedListings.css';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { getFeaturedListings } from '../../actions/listing';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';

const FeaturedListings = ({
  getFeaturedListings,
  listingReducer: { featuredListings, loading }
}) => {
  useEffect(() => {
    getFeaturedListings();
  }, [getFeaturedListings]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        featuredListings &&
        featuredListings.map(listing => (
          <div key={listing.id} className='recent-listing col-12 col-lg-6 py-5'>
            <div className='recent-listing card-header text-center mx-3'>
              <h3>Welcome Home</h3>
            </div>
            <div className='card recent-listing-card mx-3 text-center'>
              <div className='img-hover-zoom'>
                <img
                  className='card-image-top img-fluid cover-photo'
                  src={
                    listing.cover_photo &&
                    `${process.env.REACT_APP_STRAPIURL}${listing.cover_photo.url}`
                  }
                  alt={listing.description}
                />
              </div>
              <div className='card-img-overlay'>
                <h2>
                  <span className='badge badge-price'>
                    <NumberFormat
                      value={listing.price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </span>
                </h2>
              </div>
              <div className='card-body'>
                <h4 className='card-title'>
                  {listing.address} <br />
                  <i className='fas fa-map-marker-alt'></i> {listing.city},{' '}
                  {listing.state} {listing.zipcode}
                </h4>
                <p className='info'>
                  <i className='fab fa-microsoft mr-2'></i> Sqft:{' '}
                  {listing.square_feet}
                </p>
                <p className='info'>
                  <i className='fas fa-bath mr-2'></i> Bathrooms:{' '}
                  {listing.bathrooms}
                </p>
                <p className='info'>
                  <i className='fas fa-bed mr-2'></i> Bedroom:{' '}
                  {listing.bedrooms}
                </p>
                <Link to={`/listing/${listing.id}`} className='info btn'>
                  More Info
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </Fragment>
  );
};

FeaturedListings.propTypes = {
  getFeaturedListings: PropTypes.func.isRequired,
  listingReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  listingReducer: state.listingReducer
});

export default connect(mapStateToProps, { getFeaturedListings })(
  FeaturedListings
);
