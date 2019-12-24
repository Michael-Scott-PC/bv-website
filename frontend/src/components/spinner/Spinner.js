import spinner from './spinner.gif';

import React, { Fragment } from 'react';

const Spinner = () => {
  return (
    <Fragment>
      <img src={spinner} alt='spinner symbol for data loading' />
    </Fragment>
  );
};

export default Spinner;
