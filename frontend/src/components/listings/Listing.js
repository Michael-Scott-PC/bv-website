import './Listing.css';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const Listing = ({ listing }) => {
  return (
    <Fragment>
      <div className='card listing-card mx-3 text-center'>
        <div className='img-hover-zoom'>
          <img
            className='card-img-top listing-card-img-top img-fluid cover-photo'
            src={`${process.env.REACT_APP_STRAPIURL}${listing.cover_photo.url}`}
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
          <h4 className='card-title listing-title'>
            {listing.address} <br />
            <i className='fas fa-map-marker-alt mr-1'></i>
            {listing.city}, {listing.state} {listing.zipcode}
          </h4>
          <p className='info listing-info'>
            <i className='fab fa-microsoft mr-2'></i> Sqft:{' '}
            {listing.square_feet}
          </p>
          <p className='info listing-info'>
            <i className='fas fa-bath mr-2'></i> Bathrooms: {listing.bathrooms}
          </p>
          <p className='info listing-info'>
            <i className='fas fa-bed mr-2'></i> Bedrooms: {listing.bedrooms}
          </p>
          <Link to={`/listing/${listing.id}`} className='info btn'>
            More Info
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

Listing.propTypes = {
  listing: PropTypes.object.isRequired
};

export default Listing;
