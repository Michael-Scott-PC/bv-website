import './InquiryForm.css';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import { createInquiry } from '../../actions/inquiry';
import FormSchema from './schemas/formSchema';

const InquiryForm = ({ address, createInquiry }) => {
  return (
    <Formik
      validationSchema={FormSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          createInquiry(values);
          setSubmitting(false);
        }, 400);
      }}
      initialValues={{
        property: address,
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
          <Form.Group controlId='formGroupPropertyAddress'>
            <Form.Label>Property</Form.Label>
            <Form.Control
              type='text'
              placeholder={address}
              style={{ fontWeight: 'bold' }}
              readOnly
            />
          </Form.Group>

          <Row>
            <Col className='left-input-fields'>
              <Form.Group controlId='formGroupFirstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  name='first_name'
                  value={values.first_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isValid={touched.first_name && !errors.first_name}
                  isInvalid={touched.first_name && errors.first_name}
                  placeholder='enter first name'
                  required
                />
                {errors.first_name && touched.first_name ? (
                  <p style={{ color: 'red' }}>{errors.first_name}</p>
                ) : null}
              </Form.Group>
            </Col>
            <Col className='right-input-fields'>
              <Form.Group controlId='formGroupLastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  name='last_name'
                  value={values.last_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isValid={touched.last_name && !errors.last_name}
                  isInvalid={touched.last_name && errors.last_name}
                  placeholder='enter last name'
                  required
                />
                {errors.last_name && touched.last_name ? (
                  <p style={{ color: 'red' }}>{errors.last_name}</p>
                ) : null}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId='formGroupEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                  placeholder='Enter email'
                  required
                />
                {errors.email && touched.email ? (
                  <p style={{ color: 'red' }}>{errors.email}</p>
                ) : null}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='formGroupPhoneNumber'>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter phone'
                  name='phone'
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

          <Form.Group controlId='formGroupTextArea'>
            <Form.Label>Question?</Form.Label>
            <Form.Control
              as='textarea'
              name='question'
              value={values.question}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.question && !errors.question}
              isInvalid={touched.question && errors.question}
              placeholder='Enter your inquiry here'
              required
            />
            {errors.question && touched.question ? (
              <p style={{ color: 'red' }}>{errors.question}</p>
            ) : null}
          </Form.Group>
          <div className='container'>
            <div className='row justify-content-center'>
              <Button className='mt-4 mb-4 submit-inquiry' type='submit'>
                Submit
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

InquiryForm.propTypes = {
  address: PropTypes.string.isRequired,
  createInquiry: PropTypes.func.isRequired
};

export default connect(null, { createInquiry })(InquiryForm);
