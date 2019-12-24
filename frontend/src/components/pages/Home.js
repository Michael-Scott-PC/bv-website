import React, { Fragment } from 'react';

import About from '../realtor/About';
import Landing from '../layout/Landing';
// import Navbar from '../layout/Navbar';
import RecentListing from '../listings/RecentListing';
import MortgageCalculator from '../calculators/MortgageCalculator';
import Testimonials from '../customers/Testimonials';

// import Alert from '../layout/Alert';

const Home = () => {
  return (
    <Fragment>
      {/* <Navbar /> */}
      {/* <Alert /> */}
      <Landing />
      <div className='rec-listings mortg-calc container-fluid'>
        <div className='row'>
          <RecentListing />
          <MortgageCalculator />
        </div>
      </div>
      <About />
      <Testimonials />
    </Fragment>
  );
};

export default Home;
