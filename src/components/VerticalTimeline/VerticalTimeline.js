import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Transition} from 'react-transition-group'

const defaultStyle = {
  transition: `opacity 300ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
}

const VerticalTimeline = ({
  animate, 
  children, 
  className,
  inProp
}) => {
  return (
    <Transition in={inProp} timeout={300}>
      {
        (state) => (   
          <div
            className={classNames(className, 'vertical-timeline', {
              'vertical-timeline--animate': animate,
            })}
            style={{
            ...defaultStyle,
            ...transitionStyles[state]
            }}
          >
            <div className='vertical-timeline--now'>
              <div className='vertical-timeline--now__box'>
                now
              </div>
            </div>
            {children}
          </div>
        )
      }
    
  </Transition> 
  )
}
  

VerticalTimeline.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  animate: PropTypes.bool,
};

VerticalTimeline.defaultProps = {
  animate: true,
  className: '',
};

export default VerticalTimeline;
