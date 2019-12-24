// import React, { Fragment, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { getRealtors } from '../../actions/realtor';
// import store from '../../store';
// import PropTypes from 'prop-types';

// const Realtors = () => {
//   useEffect(() => {
//     store.dispatch(getRealtors());
//   }, []);

//   return (
//     <Fragment>
//       <div className=''>REALTORS COMPONENT</div>
//     </Fragment>
//   );
// };

// Realtors.propTypes = {
//   getRealtors: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({
//   realtors: state.realtorReducer
// });

// export default connect(mapStateToProps, { getRealtors })(Realtors);
