import './PicModal.css';
import 'react-multi-carousel/lib/styles.css';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import Carousel from 'react-multi-carousel';

const PicModal = props => {
  console.log(props);
  const [current, setCurrent] = useState(``);

  const cleanUp = () => {
    setCurrent(``);
    document.getElementById('root').classList.remove('blur');
  };

  if (props.currentphoto) {
    document.getElementById('root').classList.add('blur');
  }

  // this gets passed into our Carousel property
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 3,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 2,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      onExit={cleanUp}
    >
      <div className='container'>
        <div className='row'>
          <div className='col-4 center-modal'>
            <button className='inquiry btn btn-for-modal ml-2'>
              Make Inquiry
            </button>
          </div>
          <div className='col-8'>
            <Modal.Header closeButton>
              <h4 className='modal-address mr-2'>{props.address}</h4>
              <h5 className='modal-address'>
                {props.city},{props.state} {props.zipcode}
              </h5>
            </Modal.Header>
          </div>
        </div>
      </div>
      <ModalBody className='pic-modal-body'>
        <div className='container large-photo-container'>
          <div className='row large-photo-row'>
            <img
              id='large-photo'
              className='img-fluid large-photo-modal'
              src={current ? current : props.currentphoto}
              alt='pictures of real estate property'
            />
          </div>
        </div>
        <Carousel
          additionalTransfrom={0}
          arrows
          centerMode={false}
          className=''
          containerClass='container-with-dots'
          dotListClass=''
          draggable
          focusOnSelect={false}
          infinite
          itemClass=''
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          showDots={false}
          sliderClass=''
          slidesToSlide={1}
          swipeable
        >
          {props.photos &&
            props.photos.map(photo => (
              <div key={photo.id} className='mx-2 my-2'>
                <img
                  className='img-fluid thumbnail-img-modal'
                  src={`https://localhost:1337${photo.url}`}
                  alt='pictures of a property'
                  onClick={() =>
                    setCurrent(`https://localhost:1337${photo.url}`)
                  }
                />
              </div>
            ))}
        </Carousel>
      </ModalBody>
    </Modal>
  );
};

export default PicModal;
