import './InquiryModal.css';
import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import PropTypes from 'prop-types';

import InquiryForm from '../forms/InquiryForm';

const InquiryModal = ({ inquiryReducer: { sent }, address, show, onHide }) => {
  const cleanUp = () => {
    document.getElementById('root').classList.remove('blur');
  };

  if (show) {
    document.getElementById('root').classList.add('blur');
  }

  if (sent) {
    onHide();
  }

  return (
    <Modal
      show={show}
      address={address}
      onHide={onHide}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      onExit={cleanUp}
    >
      <ModalHeader className='inquiry-modal-header' closeButton>
        <br />
        <h1 className='mt-5 mx-auto make-an-inquiry'>Make an Inquiry</h1>
        <i className='fas fa-envelope inquiry-modal-envelope align-self-end mb-3'></i>
      </ModalHeader>
      <ModalBody>
        <InquiryForm address={address} />
      </ModalBody>
    </Modal>
  );
};

InquiryModal.propTypes = {
  inquiryReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  inquiryReducer: state.inquiryReducer
});

export default connect(mapStateToProps)(InquiryModal);
