import React from 'react'
import PropTypes from 'prop-types'

const MenuToggler = ({handleToggleMenu})=>
  <div className='navbar-toggler' onClick={handleToggleMenu}>
    <span className='navbar-toggler__item'></span>
    <span className='navbar-toggler__item'></span>
    <span className='navbar-toggler__item'></span>
  </div>

MenuToggler.propTypes = {
  handleToggleMenu: PropTypes.func.isRequired
}

export default MenuToggler