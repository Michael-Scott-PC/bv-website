import './ListingDetail.css';
import 'react-multi-carousel/lib/styles.css';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Carousel from 'react-multi-carousel';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getListing } from '../../actions/listing';
import history from '../../history';

import Spinner from '../spinner/Spinner';
import PicModal from './PicModal';
import InquiryModal from './InquiryModal';

const ListingDetail = ({
  getListing,
  listingReducer: { listing, loading },
  match
}) => {
  useEffect(() => {
    getListing(match.params.id);
  }, [getListing, match.params.id]);

  // Show the picture modal
  const [showPicModal, setShow] = useState({
    showPicModal: false,
    currentPhoto: ``
  });
  // Show the inquiry modal
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  // this gets passed into our Carousel property
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 3,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 2,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  };

  const {
    address,
    availability,
    basement,
    bedrooms,
    bathrooms,
    city,
    cooling,
    cover_photo, // cover_photo is an object
    description,
    garage,
    heating,
    heating_fuel,
    // id, // could use this to implement 'favorite' feature
    list_date,
    lot_size,
    open_house_date,
    open_house_end_time,
    photos, // photos is an array containing objects
    price,
    property_type,
    // publish,
    realtor, // realtor is an object
    school_district,
    square_feet,
    state,
    summer_tax,
    // updatedAt, // could use this to notify anyone with it favorited
    water,
    winter_tax,
    year_built,
    zipcode
  } = listing; // listing is an object

  const renderCoverPhoto = () => {
    if (cover_photo) {
      const { url } = cover_photo;
      return `http://localhost:1337${url}`;
    }
  };

  return (
    <Fragment>
      <div className='listing-detail'>
        <div className='address text-center py-4'>
          <div className='container'>
            <div className='row'>
              <div
                onClick={() => history.goBack()}
                className='col-1 fa-angle-left-div'
              >
                <i className='fas fa-angle-left'></i>
              </div>
              <div className='col-10'>
                <h1 className='address'>{address}</h1>
                <p className='address'>
                  <i className='fas fa-map-marker-alt mr-2'></i>
                  {city}, {state} {zipcode}
                </p>
              </div>
            </div>
          </div>
        </div>
        <img
          className='img-fluid'
          src={renderCoverPhoto()}
          alt={listing.description}
          onClick={() => {
            setShow({ showPicModal: true, currentPhoto: renderCoverPhoto() });
          }}
        />
        <PicModal
          show={showPicModal.showPicModal}
          currentphoto={showPicModal.currentPhoto}
          photos={photos}
          address={address}
          city={city}
          state={state}
          zipcode={zipcode}
          onHide={() => setShow(false)}
        />
        {!photos ? (
          <Spinner />
        ) : (
          <Fragment>
            <Carousel
              additionalTransfrom={0}
              arrows
              centerMode={false}
              className=''
              containerClass='container-with-dots'
              dotListClass=''
              draggable
              focusOnSelect={false}
              infinite
              itemClass=''
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={responsive}
              showDots={false}
              sliderClass=''
              slidesToSlide={1}
              swipeable
            >
              {photos &&
                photos.map(photo => (
                  <img
                    key={photo.id}
                    className='img-fluid thumbnail-img'
                    src={`http://localhost:1337${photo.url}`}
                    alt='pictures of a property'
                    onClick={() =>
                      setShow({
                        showPicModal: true,
                        currentPhoto: `http://localhost:1337${photo.url}`
                      })
                    }
                  />
                ))}
            </Carousel>
          </Fragment>
        )}
        {photos && (
          <h5 className='total-photos'>Total Photos: {photos.length}</h5>
        )}
        <div className='container mt-5'>
          <h1 className='property-details-header text-center mb-3'>
            Property Details
          </h1>
          <div className='row'>
            <ul className='listing-details-list col-12'>
              <div className='row'>
                <li className='listing-detail-item col-6 d-flex'>
                  <div className='detail-header col-6'> Availability: </div>{' '}
                  <div className='detail col-6'>{availability}</div>
                </li>
                <li className='listing-detail-item col-6 d-flex'>
                  <div className='detail-header col-6'>Type: </div>
                  <div className='detail col-6'>{property_type}</div>
                </li>
                <li className='listing-detail-item col-6 d-flex'>
                  <div className='detail-header col-6'>Price: </div>
                  <div className='detail col-6'>
                    <NumberFormat
                      value={price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </div>
                </li>
                <li className='listing-detail-item col-6 d-flex'>
                  <div className='detail-header col-6'>Year Built: </div>
                  <div className='detail col-6'>{year_built}</div>
                </li>
                <li className='listing-detail-item col-6 d-flex'>
                  <div className='detail-header col-6'>Lot Size: </div>
                  <div className='detail col-6'>{lot_size}</div>
                </li>
                <li className='listing-detail-item col-6 d-flex'>
                  <div className='detail-header col-6'>Sqft: </div>
                  <div className='detail col-6'>
                    <NumberFormat
                      value={square_feet}
                      displayType={'text'}
                      thousandSeparator={true}
                    />
                  </div>
                </li>
                <li className='listing-detail-item col-6 d-flex'>
                  <div className='detail-header col-6'>Bedrooms: </div>
                  <div className='detail col-6'>{bedrooms}</div>
                </li>
                <li className='listing-detail-item col-6 d-flex'>
                  <div className='detail-header col-6'>Bathrooms: </div>
                  <div className='detail col-6'>{bathrooms}</div>
                </li>
                <li className='listing-detail-item col-6 d-flex'>
                  <div className='detail-header col-6'>Basement: </div>
                  <div className='detail col-6'>{basement}</div>
                </li>
                <li className='listing-detail-item col-6 d-flex'>
                  <div className='detail-header col-6'>Garage: </div>
                  <div className='detail col-6'>{garage}</div>
                </li>
                <li className='listing-detail-item col-6 d-flex'>
                  <div className='detail-header col-6'>Summer Tax: </div>
                  <div className='detail col-6'>{summer_tax}</div>
                </li>
                <li className='listing-detail-item col-6 d-flex'>
                  <div className='detail-header col-6'>Winter Tax: </div>
                  <div className='detail col-6'>{winter_tax}</div>
                </li>
                <li className='listing-detail-item col-6 d-flex'>
                  <div className='detail-header col-6'>Heating: </div>
                  <div className='detail col-6'>{heating}</div>
                </li>
                <li className='listing-detail-item col-6 d-flex'>
                  <div className='detail-header col-6'>Heating Fuel: </div>
                  <div className='detail col-6'>{heating_fuel}</div>
                </li>
                <li className='listing-detail-item col-6 d-flex'>
                  <div className='detail-header col-6'>Water: </div>
                  <div className='detail col-6'>{water}</div>
                </li>
                <li className='listing-detail-item col-12 d-flex'>
                  <div className='detail-header col-4'>Cooling: </div>
                  <div className='detail col-8'>{cooling}</div>
                </li>
                <li className='listing-detail-item col-12 d-flex'>
                  <div className='detail-header col-4'>School District: </div>
                  <div className='detail col-8'>{school_district}</div>
                </li>
                <li className='listing-detail-item col-12 d-flex'>
                  <div className='detail-header col-4'>List Date: </div>
                  <div className='detail col-8'>
                    {moment(list_date).format('MM-DD-YYYY')}
                  </div>
                </li>
                <li className='listing-detail-item col-12 d-flex'>
                  <div className='detail-header col-4'>Next Open House: </div>
                  <div className='detail col-8'>
                    {moment(open_house_date).format('MM-DD-YYYY')}{' '}
                  </div>
                </li>
                <li className='listing-detail-item col-12 d-flex'>
                  <div className='detail-header col-4'>Open House Time: </div>
                  <div className='detail col-8'>
                    {moment(open_house_date).format('h:mma')} -{' '}
                    {moment(open_house_end_time).format('h:mma')}
                  </div>
                </li>
                <li className='listing-detail-item col-12 d-flex'>
                  <div className='detail-header col-4'>Realtor: </div>
                  <div className='detail col-8'>{realtor && realtor.name}</div>
                </li>
              </div>
            </ul>
          </div>
          <h2 className='mb-0 mt-3 d-inline-block'>Description</h2>
          <i className='fas fa-home ml-2'></i>
          <div className='container description-container text-center mb-5 p-4'>
            <p className='description-paragraph'>{description}</p>
            <button
              className='inquiry btn'
              onClick={() => setShowInquiryModal(true)}
            >
              Make Inquiry
            </button>
            <InquiryModal
              show={showInquiryModal}
              address={address}
              onHide={() => setShowInquiryModal(false)}
            />
          </div>
          <iframe
            className='mb-5'
            width='100%'
            height='auto'
            frameBorder='0'
            style={{ border: '0' }}
            title='google map'
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAP}&q=${address}`}
            allowFullScreen
          ></iframe>
          <div className='btn-container text-center'>
            <button onClick={() => history.goBack()} className='info btn mb-5'>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ListingDetail.propTypes = {
  getListing: PropTypes.func.isRequired,
  listingReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  listingReducer: state.listingReducer
});

export default connect(mapStateToProps, { getListing })(ListingDetail);
