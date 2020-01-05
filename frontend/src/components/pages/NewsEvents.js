import './NewsEvents.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getAllListings } from '../../actions/listing';

const NewsEvents = ({
  getAllListings,
  listingReducer: { allListings, loading }
}) => {
  const renderTwitterFeed = () => {
    console.log('renderTwitterFeed ran.');
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
    // renderTwitterFeed();
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    document.getElementsByClassName('twitter-embed')[0].appendChild(script);
  }, [getAllListings]);

  const renderOpenHouses = i => {
    console.log('renderOpenHouses ran.');
    const jsx = [];
    for (i = 0; i < allListings.length; i++) {
      if (allListings[i].open_house) {
        jsx.push(
          <div
            key={allListings[i].id}
            className='card container-fluid open-house-card my-4'
          >
            <div className='row'>
              <div className='col-5 open-house-img-col'>
                <img
                  className='card-img-top'
                  src={`${process.env.REACT_APP_STRAPIURL}${allListings[i].cover_photo.url}`}
                  alt='property for sale'
                  style={{
                    width: '100%',
                    height: '120px',
                    objectFit: 'fill'
                  }}
                />
              </div>
              <div className='col-7 open-house-info-col'>
                <div className='card-header'>
                  {allListings[i].address}
                  <br />
                  {allListings[i].city}, {allListings[i].state}{' '}
                  {allListings[i].zipcode}
                  <br />
                  {moment(allListings[i].open_house).format('MM-DD-YYYY')}{' '}
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
    return jsx;
  };

  // const renderTwitterFeed = () => {
  //   return (
  //     <a
  //       className='twitter-timeline'
  //       data-width='400'
  //       data-height='800'
  //       data-theme='light'
  //       href='https://twitter.com/BrianVRealtor?ref_src=twsrc%5Etfw'
  //     >
  //       Tweets by BrianVRealtor
  //     </a>
  //   );
  // };

  return (
    <div className='container-fluid mb-3'>
      <h1 className='text-center mt-5'>Upcoming Open Houses</h1>
      {renderOpenHouses()}
      <br />
      {renderTwitterFeed()}
    </div>
  );
};

const mapStateToProps = state => ({
  listingReducer: state.listingReducer
});

export default connect(mapStateToProps, { getAllListings })(NewsEvents);
