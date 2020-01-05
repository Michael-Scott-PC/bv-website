import './ContactForm.css';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import { createContact } from '../../actions/contact';
import FormSchema from './schemas/formSchema';

const ContactForm = ({ createContact }) => {
  return (
    <Fragment>
      <div className='container-fluid'>
        <Formik
          validationSchema={FormSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              createContact(values);
              setSubmitting(false);
              resetForm(true);
            }, 400);
          }}
          initialValues={{
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            question: ''
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
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Col className='text-center'>
                  <h1 className='mt-5 mx-auto get-in-touch'>
                    Get in touch!{' '}
                    <i className='fas fa-envelope contact-form-envelope align-self-end mb-3'></i>
                  </h1>
                </Col>
              </Row>
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
                  <Form.Group controlId='formGroupPhoneNumber'>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      className='text-center'
                      type='Phone'
                      name='phone'
                      placeholder='enter phone (optional)'
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.phone && !errors.phone}
                      isInvalid={touched.phone && errors.phone}
                    />
                    {errors.phone && touched.phone ? (
                      <p style={{ color: 'red' }}>{errors.phone}</p>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className='col-8 mb-3 mx-auto text-center'>
                  <Form.Group controlId='formGroupTextArea'>
                    <Form.Label>How may I help you?</Form.Label>
                    <Form.Control
                      as='textarea'
                      name='question'
                      value={values.question}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.question && !errors.question}
                      isInvalid={touched.question && errors.question}
                      required
                    />
                    {errors.question && touched.question ? (
                      <p style={{ color: 'red' }}>{errors.question}</p>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className='col-11 col-md-4 mb-3 mx-auto text-center'>
                  <Button className='mt-4 mb-5 submit-inquiry' type='submit'>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
};

ContactForm.propTypes = {
  createContact: PropTypes.func.isRequired
};

export default connect(null, { createContact })(ContactForm);
