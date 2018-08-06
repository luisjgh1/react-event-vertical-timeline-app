/* eslint-disable global-require, import/no-unresolved, react/no-multi-comp */
import React from 'react';
import mockup from './mockup'
import timelineMockups from './timelineMockups'

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

  handleYearSelect = (date)=> {
    this.setState({
      selectedDate: date
    })
    setTimeout(()=> window.scrollBy(0, 100), 1000)
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
            />
          )
        }
        <MenuToggler handleToggleMenu={this.handleToggleMenu}/>
        {
          this.state.selectedTimeline && (
            <VerticalTimeline 
              inProp={this.state.inProp}
              data={this.state.selectedTimelineData}/>
          )
        }
      </React.Fragment>
    )
  }
}
