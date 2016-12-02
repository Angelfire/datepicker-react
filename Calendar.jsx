import React from 'react';
import MonthHeader from './MonthHeader';
import WeekHeader from './WeekHeader';
import Weeks from './Weeks';

export class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.onMove = this.onMove.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }
  
  onMove(view, isForward) {
    this.textWeeks.moveTo(view, isForward);
  }

  onTransitionEnd() {
    this.textMonthHeader.enable();
  }

  toggle() {
    this.setState({
        visible: !this.state.visible
    });
  }

  hide() {
    if (this.state.visible) {
      this.setState({ visible: false });
    }
  }

  render() {
    const calendarVisible = this.state.visible ? 'calendar-show' : 'calendar-hide';
    const calendarClass = `ardp-calendar-${this.props.id} calendar ${calendarVisible}`;

    return (
      <div
        ref={(calendarComponent => { this.calendarComponent = calendarComponent; })} 
        className={calendarClass}
      >
        <MonthHeader 
          ref={(monthHeader) => { this.textMonthHeader = monthHeader; }}
          view={this.props.view}
          onMove={this.onMove}
        />
        <WeekHeader />
        <Weeks 
          ref={(weeks) => { this.textWeeks = weeks; }}
          view={this.props.view}
          selected={this.props.selected}
          onTransitionEnd={this.onTransitionEnd}
          onSelect={this.props.onSelect}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
        />
      </div>
    );
  }
}

Calendar.propTypes = {
  visible:  React.PropTypes.bool,
  view:     React.PropTypes.object,
  onMove:   React.PropTypes.func,
  id:       React.PropTypes.string,
  selected: React.PropTypes.object,
  onSelect: React.PropTypes.func,
  minDate:  React.PropTypes.object,
  maxDate:  React.PropTypes.object
};

export default Calendar;