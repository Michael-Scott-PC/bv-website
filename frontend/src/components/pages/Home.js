import './Home.css';
import React, { Fragment } from 'react';
import About from '../realtor/About';
import Landing from '../layout/Landing';
import RecentListing from '../listings/RecentListing';
import MortgageCalculator from '../calculators/MortgageCalculator';
import Testimonials from '../customers/Testimonials';

const Home = () => {
  return (
    <Fragment>
      <Landing />
      <div className='rec-listings mortg-calc container-fluid'>
        <div className='row recent-listing-calculator-row'>
          <div className='recent-listing-parent col-12 col-md-6 py-5'>
            <RecentListing />
          </div>
          <div className='mortgage-calculator-parent col-12 col-md-6 py-5'>
            <MortgageCalculator />
          </div>
        </div>
      </div>
      <About />
      <Testimonials />
    </Fragment>
  );
};

export default Home;
