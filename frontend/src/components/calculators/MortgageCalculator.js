import './MortgageCalculator.css';
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Overlay } from 'react-bootstrap';
import axiosSecondServer from '../../api/axiosSecondServer';
import { state_choices, programs, credit_range } from './choices';
import validateCalculator from './validateCalculator';

const MortgageCalculator = () => {
  // Tooltip overlays to help end users format calculator data properly
  const [showValueOverlay, setShowValOverlay] = useState(false);
  const targetValue = useRef(null);
  const [showLoanOverlay, setShowLoanOverlay] = useState(false);
  const targetLoan = useRef(null);
  const [showLocationOverlay, setShowLocOverlay] = useState(false);
  const targetLocation = useRef(null);
  const [showStateOverlay, setShowStateOverlay] = useState(false);
  const targetState = useRef(null);

  // Set the calculator values from the input fields &
  // use the defaults specified by Zillow API in case no onChange is triggered
  // Remove null values from params object on backend
  const [propertyValue, setPropertyVal] = useState(null);
  const [loanAmount, setLoanAmount] = useState(null);
  const [stateAbbr, setStateAbbr] = useState('US');
  const [zipcode, setZipcode] = useState(null);
  const [creditScore, setCreditScore] = useState('VeryHigh');
  const [program, setProgram] = useState('Fixed30Year');
  const [loanType, setLoanType] = useState('Conventional');
  const [loanToValueBucket] = useState('Normal');
  const [loanAmountBucket] = useState('Conforming');

  // error validation for calculator
  const [errors, setErrors] = useState({});

  // Set the current rate and APR values returned from Zillow API
  const [currentRate, setCurrentRate] = useState(0);
  const [currentApr, setCurrentApr] = useState(0);

  const [isDisabled, setIsDisabled] = useState(true);

  const getCurrentRates = async () => {
    try {
      const res = await axiosSecondServer.get('/api/calculator/', {
        params: {
          stateAbbr,
          program,
          loanType,
          creditScore,
          loanAmountBucket,
          loanToValueBucket,
          propertyValue,
          loanAmount,
          zipcode
        }
      });
      console.log(res);
      setCurrentRate(res.data.rates[1].rate);
      setCurrentApr(res.data.rates[1].apr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (program === '30-Year Fixed') {
      setProgram('Fixed30Year');
      setLoanType('Conventional');
    } else if (program === '30-Year Fixed FHA') {
      setProgram('Fixed30Year');
      setLoanType('FHA');
    } else if (program === '30-Year Fixed VA') {
      setProgram('Fixed30Year');
      setLoanType('VA');
    } else if (program === '15-Year Fixed') {
      setProgram('Fixed15Year');
      setLoanType('Conventional');
    } else if (program === '5-Year ARM') {
      setProgram('ARM5');
      setLoanType('Conventional');
    }
    // console.log('useEffect ran.');
    setErrors(validateCalculator(propertyValue, loanAmount, zipcode));
    console.log('setErrors ran.');
    if (Object.keys(errors).length === 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [program, propertyValue, loanAmount, zipcode]);

  const onFormSubmit = e => {
    e.preventDefault();

    getCurrentRates();
  };

  return (
    <Fragment>
      <div className='mortgage-calculator col-12 col-lg-7 py-5'>
        <div className='mortgage card text-center'>
          <div className='calculator card-title mt-4'>
            <h3>Mortgage Rate Calculator</h3>
          </div>
          <form onSubmit={onFormSubmit} noValidate>
            <div className='row mx-2 mb-3'>
              <div className='form-group col'>
                <label htmlFor='home-price'>Property Value &#40;$&#41;</label>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>$</span>
                  </div>
                  <input
                    type='text'
                    name='home-price'
                    id='inlineFormInputGroup'
                    className='form-control'
                    placeholder=''
                    ref={targetValue}
                    onChange={e => setPropertyVal(e.target.value)}
                    onMouseEnter={() => setShowValOverlay(!showValueOverlay)}
                    onMouseLeave={() => setShowValOverlay(!showValueOverlay)}
                  />
                  <p style={{ color: 'red' }}>{errors.propertyValue}</p>
                  <Overlay
                    target={targetValue.current}
                    show={showValueOverlay}
                    placement='bottom'
                  >
                    {({
                      placement,
                      scheduleUpdate,
                      arrowProps,
                      outOfBoundaries,
                      show: _show,
                      ...props
                    }) => (
                      <div
                        {...props}
                        style={{
                          backgroundColor: '#aaceaa',
                          padding: '2px 10px',
                          color: 'white',
                          borderRadius: 3,
                          ...props.style
                        }}
                      >
                        Ex: Enter $200,000 as 200000
                      </div>
                    )}
                  </Overlay>
                </div>
              </div>
              <div className='form-group col'>
                <label htmlFor='loan-amount'>Loan Amount &#40;$&#41;</label>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>$</span>
                  </div>
                  <input
                    type='text'
                    name='loan-amount'
                    id='inlineFormInputGroup'
                    className='form-control'
                    placeholder=''
                    ref={targetLoan}
                    onChange={e => setLoanAmount(e.target.value)}
                    onMouseEnter={() => setShowLoanOverlay(!showLoanOverlay)}
                    onMouseLeave={() => setShowLoanOverlay(!showLoanOverlay)}
                  />
                  <p style={{ color: 'red' }}>{errors.loanAmount}</p>
                  <Overlay
                    target={targetLoan.current}
                    show={showLoanOverlay}
                    placement='bottom'
                  >
                    {({
                      placement,
                      scheduleUpdate,
                      arrowProps,
                      outOfBoundaries,
                      show: _show,
                      ...props
                    }) => (
                      <div
                        {...props}
                        style={{
                          backgroundColor: '#aaceaa',
                          padding: '2px 10px',
                          color: 'white',
                          borderRadius: 3,
                          ...props.style
                        }}
                      >
                        Ex: Enter $200,000 as 200000
                      </div>
                    )}
                  </Overlay>
                </div>
              </div>
            </div>
            <div className='row mx-2 mb-3'>
              <div className='form-group col'>
                <label htmlFor='state'>State</label>
                <select
                  onChange={e => setStateAbbr(e.target.value)}
                  id='inputState'
                  className='form-control'
                  ref={targetState}
                  onClick={() => setShowStateOverlay(!showStateOverlay)}
                  onMouseLeave={() => setShowStateOverlay(!showStateOverlay)}
                >
                  <Overlay
                    target={targetState.current}
                    show={showStateOverlay}
                    placement='bottom'
                  >
                    {({
                      placement,
                      scheduleUpdate,
                      arrowProps,
                      outOfBoundaries,
                      show: _show,
                      ...props
                    }) => (
                      <div
                        {...props}
                        style={{
                          backgroundColor: '#aaceaa',
                          padding: '2px 10px',
                          color: 'white',
                          borderRadius: 3,
                          ...props.style
                        }}
                      >
                        Leaving State as "US" &amp; Zipcode blank will return
                        national averages.
                      </div>
                    )}
                  </Overlay>
                  {Object.keys(state_choices).map(state => (
                    <option
                      key={state}
                      value={state_choices[state]}
                      defaultValue
                    >
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <p
                alt="'or' means you may specify a state or zipcode"
                style={{ color: 'black' }}
              >
                Or
              </p>
              <div className='form-group col'>
                <label htmlFor='zipcode'>Zip Code</label>
                <input
                  type='text'
                  name='zipcode'
                  className='form-control text-center'
                  placeholder='optional'
                  ref={targetLocation}
                  onChange={e => setZipcode(e.target.value)}
                  onMouseEnter={() => setShowLocOverlay(!showLocationOverlay)}
                  onMouseLeave={() => setShowLocOverlay(!showLocationOverlay)}
                />
                <p style={{ color: 'red' }}>{errors.zipcode}</p>
                <Overlay
                  target={targetLocation.current}
                  show={showLocationOverlay}
                  placement='bottom'
                >
                  {({
                    placement,
                    scheduleUpdate,
                    arrowProps,
                    outOfBoundaries,
                    show: _show,
                    ...props
                  }) => (
                    <div
                      {...props}
                      style={{
                        backgroundColor: '#aaceaa',
                        padding: '2px 10px',
                        color: 'white',
                        borderRadius: 3,
                        ...props.style
                      }}
                    >
                      If you enter a zip code, you must enter the Property Value
                      &amp; Loan Amount fields.
                    </div>
                  )}
                </Overlay>
              </div>
            </div>
            <div className='row mx-2'>
              <div className='form-group col mb-3'>
                <label htmlFor='program'>Program</label>
                <select
                  onChange={e => setProgram(e.target.value)}
                  id='inputState'
                  className='form-control'
                >
                  {Object.keys(programs).map(program => (
                    <option
                      value={programs[program]}
                      key={program}
                      defaultValue
                    >
                      {program}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group col mb-3'>
                <label htmlFor='credit-range'>Credit Range</label>
                <select
                  onChange={e => setCreditScore(e.target.value)}
                  id='inputState'
                  className='form-control'
                >
                  {Object.keys(credit_range).map(range => (
                    <option
                      key={range}
                      value={credit_range[range]}
                      defaultValue
                    >
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <button
                  type='submit'
                  className='calculate btn my-4'
                  disabled={isDisabled}
                >
                  Calculate
                </button>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label htmlFor='estimates'>Estimates:</label>
              </div>
            </div>
            <div className='row mx-2 mb-3'>
              <div className='input-group col '>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>rate</div>
                </div>
                <input
                  type='text'
                  className='form-control'
                  id='inlineFormInputGroup'
                  placeholder={currentRate}
                />
              </div>
              <div className='input-group col '>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>apr</div>
                </div>
                <input
                  type='text'
                  className='form-control'
                  id='inlineFormInputGroup'
                  placeholder={currentApr}
                />
              </div>
            </div>
          </form>
          <p className='zillow'>
            See more{' '}
            <a href='https://www.zillow.com/mortgage-rates/.'>mortgage rates</a>{' '}
            on Zillow
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default MortgageCalculator;
