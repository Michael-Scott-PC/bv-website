import './About.css';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';
import styled from 'styled-components';

import { getBrianInfo } from '../../actions/realtor';
import Spinner from '../spinner/Spinner';

const About = ({ getBrianInfo, brian: { brian, brian_headshot_url } }) => {
  useEffect(() => {
    getBrianInfo();
  }, [getBrianInfo]);

  const { about, loading, headshot } = brian;

  if (!about) {
    return null;
  } else {
    setTimeout(function() {
      render(<Markdown>{about}</Markdown>, document.getElementById('markup'));
    }, 500);
  }

  const SplitTextStyled = styled.div`
    overflow: hidden;

    #pinContainer .brian {
      transition: transform 0.5s ease-in;
      transform: matrix(1, 0, 0, 1, 0, 0);
    }

    #pinContainer .panel {
      transition: transform 0.5s ease-in;
    }
  `;

  return (
    <Fragment>
      <div className='about container-fluid px-3 py-5'>
        {brian === null ||
        brian_headshot_url === null ||
        about === null ||
        loading ? (
          <Spinner />
        ) : (
          <div className='card about-card'>
            <div className='row no-gutters'>
              <div className='col-md-5'>
                <SplitTextStyled>
                  <Controller>
                    <Scene
                      triggerElement='.brian'
                      triggerHook='onCenter'
                      pin={false}
                      reverse={false}
                      duration={10}
                      offset={0}
                    >
                      <Timeline wrapper={<div id='pinContainer' />}>
                        <Tween from={{ x: '100%' }} to={{ x: '0%' }}>
                          {!headshot ? (
                            <Spinner />
                          ) : (
                            <img
                              src={`${process.env.REACT_APP_STRAPIURL}${headshot.url}`}
                              alt=''
                              className='brian card-img-top'
                              style={{
                                borderTopLeftRadius: '8px',
                                borderTopRightRadius: '8px'
                              }}
                            />
                          )}
                        </Tween>
                      </Timeline>
                    </Scene>
                  </Controller>
                </SplitTextStyled>
              </div>
              <div className='col-md-7'>
                <div className='about card-body'>
                  <SplitTextStyled>
                    <Controller>
                      <Scene
                        triggerElement='#markup'
                        triggerHook='onCenter'
                        pin={false}
                        reverse={false}
                        duration={10}
                        offset={0}
                      >
                        <Timeline wrapper={<div id='pinContainer' />}>
                          <Tween from={{ x: '100%' }} to={{ x: '0%' }}>
                            <h2 className='about panel card-title text-center'>
                              ABOUT BRIAN
                            </h2>
                            <div
                              id='markup'
                              className='about panel card-text text-center'
                            ></div>
                          </Tween>
                        </Timeline>
                      </Scene>
                    </Controller>
                  </SplitTextStyled>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

About.propTypes = {
  getBrianInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  brian: state.realtorReducer
});

export default connect(mapStateToProps, { getBrianInfo })(About);
