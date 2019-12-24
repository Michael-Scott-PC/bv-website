import './Alert.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div
      className={`alert custom-alert alert-${alert.alertType}`}
      key={alert.id}
    >
      {alert.msg === 'An internal server error occurred'
        ? 'Your message appears to have already been sent. If you believe this to be an error, email brian@aredetroit.com'
        : alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alertReducer
});

export default connect(mapStateToProps)(Alert);
