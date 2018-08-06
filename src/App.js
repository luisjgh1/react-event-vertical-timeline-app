/* eslint-disable global-require, import/no-unresolved, react/no-multi-comp */
import React from 'react';
import mockup from './mockup'
import timelineMockups from './timelineMockups'
import uuid from 'uuid/v1'
import { scroller } from 'react-scroll'

import { VerticalTimeline } from './components/VerticalTimeline'
import QuickNavigation from './components/QuickNavigation'
import OverlayedMenu from './components/OverlayedMenu'
import MenuToggler from './components/OverlayedMenu/MenuToggler'

import './App.css';

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
    const newObjects = selectedTimelineData.Objects
      .map(object=> ({...object, id: uuid()}))
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
      selectedTimelineData: {
        ...selectedTimelineData, Objects: newObjects  
      },
    }))
  }

  handleYearSelect = (date)=> {
    console.log(date)
    this.setState({
      selectedDate: date
    })
  }

  handleMonthSelect = (month)=> {
    const { selectedDate } = this.state
    const eventId = this.state.selectedTimelineData.Objects.filter(object=> {
      const [year, eventMonth] = object.Date.split('-')
      return parseInt(year) === parseInt(selectedDate.Year) && parseInt(month) === parseInt(eventMonth)
    })[0].id
    scroller.scrollTo(eventId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }

  render(){
    const timelines = timelineMockups.Timelines
    return (
      <React.Fragment>
        <OverlayedMenu 
          timelines={timelines} 
          isVisible={this.state.menuVisible}
          setter={this.handleTimelineSelect}/>
        {
          this.state.selectedTimeline && (
            <QuickNavigation
              dates={this.state.selectedTimeline.Dates}
              selectedMonths={this.state.selectedDate.Months}
              onYearSelect={this.handleYearSelect}
              onMonthSelect={this.handleMonthSelect}
            />
          )
        }
        <MenuToggler handleToggleMenu={this.handleToggleMenu}/>
        {
          this.state.selectedTimeline && (
            <VerticalTimeline 
              inProp={this.state.inProp}
              data={this.state.selectedTimelineData.Objects}/>
          )
        }
      </React.Fragment>
    )
  }
}
