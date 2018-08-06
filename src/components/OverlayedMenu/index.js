import React from 'react'
import PropTypes from 'prop-types'

const OverlayedMenu = ({
  isVisible = false,
  timelines,
  setter
}) => 
  <div 
    className={`overlayed-menu overlayed-menu--${
      isVisible ? 'visible' : 'hidden'
    }`}
  >
    {timelines.map((timeline, index)=> 
      <span key={index} className='overlayed-menu__item' onClick={()=> setter(timeline)}>
        {timeline.Name}
      </span>
    )}
  </div>

OverlayedMenu.proptTypes = {
  isVisible: PropTypes.bool,
  timelines: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.string)
  ]),
  setter: PropTypes.func.isRequired
}  

export default OverlayedMenu