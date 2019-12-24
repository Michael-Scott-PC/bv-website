import './AuthModal.css';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Nav, Col, Row } from 'react-bootstrap';

import Register from './Register';
import Login from './Login';
import Alert from '../../layout/Alert';

const AuthModal = props => {
  const [showRegister, setShowRegister] = useState('none');
  const [showLogin, setShowLogin] = useState('block');

  const cleanUp = () => {
    document.getElementById('root').classList.remove('blur');
  };

  if (props.show) {
    document.getElementById('root').classList.add('blur');
  }

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      onExit={cleanUp}
    >
      <Row className='nav-row col-6'>
        <Nav className='auth-nav-tabs' variant='tabs' defaultActiveKey='#!'>
          <Nav.Item className='auth-nav-item col-6'>
            <Nav.Link 
              href='#!'
              onClick={() => {setShowRegister('none'); setShowLogin('block')}}
              className='auth-text'
            >
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='auth-nav-item col-6'>
            <Nav.Link 
              eventKey='link-1'
              onClick={() => {setShowRegister('block'); setShowLogin('none')}}
              className='auth-text'
            >
              Register
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
      <Modal.Body>
        <Alert />
        <Row>
          <Col className='col-3 offset-9'>
            <Modal.Header className='auth-header' closeButton></Modal.Header>
          </Col>
        </Row>
        <Login style={showLogin} setshowlogin={setShowLogin}/>
        <Register check={props.onEnter} style={showRegister} setshowregister={setShowRegister} />
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
