import './App.css';
import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Alert from '../components/layout/Alert';
import Navbar from '../components/layout/Navbar';
import Home from '../components/pages/Home';
import Listings from '../components/pages/Listings';
import ListingDetail from '../components/listing/ListingDetail';
import NewsEvents from '../components/pages/NewsEvents';
import Contact from '../components/pages/Contact';
import Footer from '../components/layout/Footer';

import history from '../history';
import setAuthToken from '../utils/setAuthToken';

import store from '../store';

import { loadUser } from '../actions/profile';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Navbar />
        <Alert />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/browse-listings' exact component={Listings} />
          <Route path='/listing/:id' exact component={ListingDetail} />
          <Route path='/news-events' exact component={NewsEvents} />
          <Route path='/contacts' exact component={Contact} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
