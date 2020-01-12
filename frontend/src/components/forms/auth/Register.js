import './Register.css';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import { createUser } from '../../../actions/profile';
import RegisterSchema from '../schemas/registerSchema';

// import GoogleAuth from './GoogleAuth';

const Register = ({ createUser, style, setshowregister }) => {
  return (
    <Fragment>
      <Formik
        validationSchema={RegisterSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            createUser(values);
            setSubmitting(false);
            // resetForm(true);
          }, 400);
        }}
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          username: '',
          password: '',
          password2: ''
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
              className='register-modal-component'
              style={{ display: `${style}` }}
              onLoad={() => setshowregister('none')}
            >
              <Row>
                <Col className='col-8 mx-auto text-center'>
                  <Form.Group controlId='formGroupFirstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type='text'
                      name='first_name'
                      placeholder='enter first name'
                      className='text-center'
                      value={values.first_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isValid={touched.first_name && !errors.first_name}
                      isInvalid={touched.first_name && errors.first_name}
                      required
                    />
                    {errors.first_name && touched.first_name ? (
                      <p style={{ color: 'red' }}>{errors.first_name}</p>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className='col-8 mx-auto text-center'>
                  <Form.Group controlId='formGroupLastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type='text'
                      name='last_name'
                      placeholder='enter last name'
                      className='text-center'
                      value={values.last_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isValid={touched.last_name && !errors.last_name}
                      isInvalid={touched.last_name && errors.last_name}
                      required
                    />
                    {errors.last_name && touched.last_name ? (
                      <p style={{ color: 'red' }}>{errors.last_name}</p>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className='col-8 mx-auto text-center'>
                  <Form.Group controlId='formGroupEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      name='email'
                      placeholder='enter email'
                      className='text-center'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && errors.email}
                      required
                    />
                    {errors.email && touched.email ? (
                      <p style={{ color: 'red' }}>{errors.email}</p>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className='col-8 mx-auto text-center'>
                  <Form.Group controlId='formGroupEmail'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type='username'
                      name='username'
                      placeholder='Choose a username'
                      className='text-center'
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.username && !errors.username}
                      isInvalid={touched.username && errors.username}
                      required
                    />
                    {errors.username && touched.username ? (
                      <p style={{ color: 'red' }}>{errors.username}</p>
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
                <Col className='col-8 mx-auto text-center'>
                  <Form.Group controlId='formGroupPassword2'>
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control
                      type='password'
                      name='password2'
                      placeholder='re-enter password'
                      className='text-center'
                      value={values.password2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.password2 && !errors.password2}
                      isInvalid={touched.password2 && errors.password2}
                      required
                    />
                    {errors.password2 && touched.password2 ? (
                      <p style={{ color: 'red' }}>{errors.password2}</p>
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
              <h2 className='text-center mt-3'>Or Register with Google</h2>
              <GoogleAuth /> */}
            </Form>
          </Fragment>
        )}
      </Formik>
    </Fragment>
  );
};

Register.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default connect(null, { createUser })(Register);
