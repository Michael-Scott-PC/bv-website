import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import ContactForm from '../forms/ContactForm';

const Contact = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Contact Brian</title>
        <meta
          name='description'
          content='Contact form to inquire about buying, selling, or renting properties.'
        />
      </Helmet>
      <ContactForm />
    </Fragment>
  );
};

export default Contact;
