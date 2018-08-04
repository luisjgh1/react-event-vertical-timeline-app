/* eslint-disable global-require, import/no-unresolved, react/no-multi-comp */
import React from 'react';

import { VerticalTimeline, VerticalTimelineElement } from './components/VerticalTimeline';
import OverlayedMenu from './components/OverlayedMenu'
import mockup from './mockup'
import timelineMockups from './timelineMockups'
import './App.css';

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

export default class App extends React.Component {
  state = {
    years: [],
    menuVisible: false,
    currentTimeLine: null,
    selectedDate: null,
    inProp: false
  }
  
  handleToggleMenu = ()=> {
    this.setState({
      menuVisible: !this.state.menuVisible
    })
  }

  handleTimelineSelect = (timeline)=> {
    const selectedTimelineData = mockup.timelineDetails.filter(
      timelineObject=> timelineObject.Name === timeline.Name
    )[0]
    this.setState({
      inProp: false,
      menuVisible: false 
    })
    /**
     * api call simulation
     * */
    setTimeout(()=> this.setState({
      inProp: true,
      selectedTimeline: timeline,
      selectedDate: timeline.Dates[0],
      selectedTimelineData,
    }))
  }

  handleDateSelect = (date)=> {
    this.setState({
      selectedDate: date
    })
  }

  render(){
    const timelines = timelineMockups.Timelines
    const formatDate = (date)=> { 
      const [year, month] = date.split('-')
      return `${months[month - 1]}, ${year}`
    }

    return (
      <React.Fragment>
        <OverlayedMenu 
          timelines={timelines} 
          isVisible={this.state.menuVisible}
          setter={this.handleTimelineSelect}/>
        {
          this.state.selectedTimeline && (
            <div className='quick-navigation'>
              {this.state.selectedTimeline.Dates.map(date=> 
                <span 
                  className='quick-navigation__element'
                  onClick={()=> this.handleDateSelect(date)}>
                  {date.Year}
                </span>
              )}
              <div className='quick-navigation__divider'/>
              {months.map((month, index)=> 
                <span 
                  className={`quick-navigation__element ${
                    this.state.selectedDate.Months.filter(e=> e === index + 1).length
                      ? 'quick-navigation__element--active'
                      : 'quick-navigation__element--disabled'
                  }`}
                  >
                  {month.slice(0, 3)}
                </span>
              )}
            </div>
          )
        }
        <div className='navbar-toggler' onClick={this.handleToggleMenu}>
          <span className='navbar-toggler__item'></span>
          <span className='navbar-toggler__item'></span>
          <span className='navbar-toggler__item'></span>
        </div>
        {
          this.state.selectedTimeline && (
            <VerticalTimeline inProp={this.state.inProp}>
              {
                this.state.selectedTimelineData.Objects.map(event =>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date={formatDate(event.Date)}
                  >
                    <span dangerouslySetInnerHTML={{ __html: event.HTML }} /> 
                    <h3 className="vertical-timeline-element-title">{event.Title}</h3>
                    <p>
                      {event.ShortDescription}
                    </p>
                  </VerticalTimelineElement>
                )
              }
            </VerticalTimeline>
          )
        }
      </React.Fragment>
    )
  }
}
