import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import AllListings from '../listings/AllListings';

const Listings = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Browse Listings</title>
        <meta
          name='description'
          content='Browse properties for sale and for rent in Detroit, MI.'
        />
      </Helmet>
      <AllListings />
    </Fragment>
  );
};

export default Listings;
