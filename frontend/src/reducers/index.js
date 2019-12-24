import { combineReducers } from 'redux';
import realtorReducer from './realtorReducer';
import landingReducer from './landingReducer';
import listingReducer from './listingReducer';
import testimonialReducer from './testimonialReducer';
import inquiryReducer from './inquiryReducer';
import contactReducer from './contactReducer';
import alertReducer from './alertReducer';
import authReducer from './authReducer';

export default combineReducers({
  realtorReducer,
  landingReducer,
  listingReducer,
  testimonialReducer,
  inquiryReducer,
  contactReducer,
  alertReducer,
  authReducer
});
