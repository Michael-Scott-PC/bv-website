import './App.css';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Alert from '../components/layout/Alert';
import Navbar from '../components/layout/Navbar';
import Home from '../components/pages/Home';
// import AllListings from '../components/listings/AllListings';
import Listings from '../components/pages/Listings';
import ListingDetail from '../components/listing/ListingDetail';
import NewsEvents from '../components/pages/NewsEvents';
import Contact from '../components/pages/Contact';
import Footer from '../components/layout/Footer';

import history from '../history';

const App = () => {
  return (
    <Router history={history}>
      <Navbar />
      <Alert />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/listings' exact component={Listings} />
        <Route path='/listings/:id' exact component={ListingDetail} />
        <Route path='/news-events' exact component={NewsEvents} />
        <Route path='/contacts' exact component={Contact} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
