import './Testimonials.css';
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
// import Markdown from 'markdown-to-jsx';
import Carousel from 'react-bootstrap/Carousel';
import { connect } from 'react-redux';
import { getTestimonials } from '../../actions/testimonial';
// import { render } from 'react-dom';

const Testimonials = ({
  getTestimonials,
  testimonialsReducer: { loading, testimonials }
}) => {
  useEffect(() => {
    getTestimonials();
  }, [getTestimonials]);

  // console.log(testimonials);

  return (
    <Fragment>
      <div className='testimonials container-fluid'>
        <div className='testimonials row'>
          <Carousel className='text-center align-self-center px-3'>
            {testimonials.map(testimonial => (
              <Carousel.Item key={testimonial._id}>
                <i className='fas fa-quote-left'></i>
                {testimonial.client_testimonial}
                <i className='fas fa-quote-right'></i>
                <footer className='blockquote-footer'>
                  <cite className='cite-name' title='Source Title'>
                    {testimonial.client_name}
                  </cite>
                </footer>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </Fragment>
  );
};

Testimonials.propTypes = {
  getTestimonials: PropTypes.func.isRequired,
  testimonialsReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  testimonialsReducer: state.testimonialReducer
});

export default connect(mapStateToProps, { getTestimonials })(Testimonials);
