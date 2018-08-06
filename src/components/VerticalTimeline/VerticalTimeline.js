import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames'

import VerticalTimelineElement from './VerticalTimelineElement'
import {Transition} from 'react-transition-group'

const defaultStyle = {
  transition: `opacity 300ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
}

const formatDate = (date)=> {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October', 
    'November',
    'December'
  ] 
  const [year, month] = date.split('-')
  return `${months[month - 1]}, ${year}`
}

const VerticalTimeline = ({
  animate, 
  data, 
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
            {
              data.Objects.map((event, index) =>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date={formatDate(event.Date)}
                  key={index}
                >
                  <span dangerouslySetInnerHTML={{ __html: event.HTML }} /> 
                  <h3 className="vertical-timeline-element-title">{event.Title}</h3>
                  <p>
                    {event.ShortDescription}
                  </p>
                </VerticalTimelineElement>
              )
            }
          </div>
        )
      }
    
  </Transition> 
  )
}
  

VerticalTimeline.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
  animate: PropTypes.bool,
};

VerticalTimeline.defaultProps = {
  animate: true,
  className: '',
};

export default VerticalTimeline;
