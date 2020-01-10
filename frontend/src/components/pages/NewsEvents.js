import './NewsEvents.css';
import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getAllListings } from '../../actions/listing';

const NewsEvents = ({
  getAllListings,
  listingReducer: { allListings, loading }
}) => {
  const renderTwitterFeed = () => {
    return (
      <div className='twitter-embed'>
        <a
          className='twitter-timeline'
          data-width='400'
          data-height='800'
          data-theme='light'
          href='https://twitter.com/BrianVRealtor?ref_src=twsrc%5Etfw'
        >
          Tweets by BrianVRealtor
        </a>
      </div>
    );
  };

  useEffect(() => {
    getAllListings();
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    document.getElementsByClassName('twitter-embed')[0].appendChild(script);
  }, [getAllListings]);

  const renderOpenHouses = i => {
    const now = new Date();
    console.log(now);
    console.log(typeof now);
    const jsx = [
      <h1 key={'open-house-header'} className='ml-4 mt-5 col-12'>
        Upcoming Open Houses
      </h1>
    ];
    for (i = 0; i < allListings.length; i++) {
      if (allListings[i].open_house) {
        console.log(allListings[i].open_house);
        console.log(typeof allListings[i].open_house);
        const converted_date = new Date(allListings[i].open_house);
        if (converted_date > now) {
          jsx.push(
            <div
              key={allListings[i].id}
              className='card container-fluid open-house-card my-4'
            >
              <div className='row open-house-row'>
                <div className='col-5 col-md-4 open-house-img-col'>
                  <img
                    className='card-img-top cover-thumbnail'
                    src={`${process.env.REACT_APP_STRAPIURL}${allListings[i].cover_photo.url}`}
                    alt='property for sale'
                    style={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'fill'
                    }}
                  />
                </div>
                <div className='col-7 col-md-8 open-house-info-col'>
                  <div className='card-header open-house-text'>
                    {allListings[i].address}
                    <br />
                    {allListings[i].city}, {allListings[i].state}{' '}
                    {allListings[i].zipcode}
                    <br />
                    {moment(allListings[i].open_house).format(
                      'MM-DD-YYYY'
                    )}{' '}
                    <br />
                    {moment(allListings[i].open_house).format('h:mma')} -{' '}
                    {moment(allListings[i].open_house_end_time).format('h:mma')}
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
    }
    if (jsx.length === 1) {
      return (
        <Fragment>
          <h1 key={'open-house-header'} className='ml-4 mt-5 col-12'>
            Upcoming Open Houses
          </h1>
          <p style={{ color: '#000000' }}>
            There are currently no scheduled open houses. Please check back at a
            later date or contact Brian for any open house information.
          </p>
        </Fragment>
      );
    }
    return jsx;
  };

  return (
    <div className='container-fluid mb-5'>
      <div className='row'>
        <div className='col-lg-6'>{renderOpenHouses()}</div>
        <br />
        <div className='col-lg-6'>{renderTwitterFeed()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  listingReducer: state.listingReducer
});

export default connect(mapStateToProps, { getAllListings })(NewsEvents);
