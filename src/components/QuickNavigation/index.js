import React from 'react'
import PropTypes from 'prop-types'

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

const QuickNavigation = ({
  dates,
  selectedMonths,
  onYearSelect,
  onMonthSelect
})=>
  <div className='quick-navigation'>
    {dates.map((date, index)=> 
      <span
        key={index} 
        className='quick-navigation__element'
        onClick={()=> onYearSelect(date)}>
        {date.Year}
      </span>
    )}
    <div className='quick-navigation__divider'/>
    {months.map((month, index)=> 
      <span
        key={index}
        onClick={()=> onMonthSelect(index+1)} 
        className={`quick-navigation__element ${
          selectedMonths.filter(e=> e === index + 1).length
            ? 'quick-navigation__element--active'
            : 'quick-navigation__element--disabled'
        }`}
        >
        {month.slice(0, 3)}
      </span>
    )}
</div>

QuickNavigation.propTypes = {
  dates: PropTypes.array,
  selectedMonths: PropTypes.array,
  onYearSelect: PropTypes.func.isRequired,
  onMonthSelect: PropTypes.func.isRequired
}

export default QuickNavigation