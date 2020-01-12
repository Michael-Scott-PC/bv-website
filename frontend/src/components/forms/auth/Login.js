import './Login.css';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import LoginSchema from '../schemas/loginSchema';
// import GoogleAuth from './GoogleAuth';

import { loginUser, googleSignIn } from '../../../actions/profile';

const Login = ({ style, setshowlogin, loginUser, authReducer }) => {
  return (
    <Fragment>
      <Formik
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            loginUser(values);
            setSubmitting(false);
            resetForm(true);
          }, 400);
        }}
        initialValues={{
          identifier: '',
          password: ''
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors
        }) => (
          <Fragment>
            <Form
              noValidate
              onSubmit={handleSubmit}
              onLoad={() => setshowlogin('block')}
              className='login-modal-component'
              style={{ display: `${style}` }}
            >
              <Row>
                <Col className='col-8 mx-auto text-center'>
                  <Form.Group controlId='formGroupEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      name='identifier'
                      placeholder='enter email'
                      className='text-center'
                      value={values.identifier}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.identifier && !errors.identifier}
                      isInvalid={touched.identifier && errors.identifier}
                      required
                    />
                    {errors.identifier && touched.identifier ? (
                      <p style={{ color: 'red' }}>{errors.identifier}</p>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className='col-8 mx-auto text-center'>
                  <Form.Group controlId='formGroupPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      name='password'
                      placeholder='enter password'
                      className='text-center'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.password && !errors.password}
                      isInvalid={touched.password && errors.password}
                      required
                    />
                    {errors.password && touched.password ? (
                      <p style={{ color: 'red' }}>{errors.password}</p>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className='col-11 col-md-4 mb-3 mx-auto text-center'>
                  <Button className='mt-4 mb-3 submit-inquiry' type='submit'>
                    Submit
                  </Button>
                </Col>
              </Row>
              {/* <span className='divider mx-auto'></span>
              <h2 className='text-center mt-3'>Or Sign in with Google</h2>
              <GoogleAuth /> */}
            </Form>
          </Fragment>
        )}
      </Formik>
    </Fragment>
  );
};

Login.propTypes = {
  authReducer: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authReducer: state.authReducer
});

export default connect(mapStateToProps, { loginUser, googleSignIn })(Login);
