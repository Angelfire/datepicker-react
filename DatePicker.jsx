import React from 'react';
import { clone, toString } from './utils/DateUtilities';
import Calendar from './Calendar';

require('./DatePicker.scss');

export class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    const def = this.props.selected || new Date();

    this.state = {
      view: clone(def),
      selected: clone(def),
      minDate: null, 
      maxDate: null,
      visible: false,
      id: this.getUniqueIdentifier()
    };

    this.toggle = this.toggle.bind(this);
    this.hide = this.hide.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.hideOnDocumentClick = this.hideOnDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.hideOnDocumentClick);
  }
  
  componentWillUnmount() {
    document.removeEventListener('click', this.hideOnDocumentClick);
  }
  
  onSelect(day) {
    this.setState({ selected: day });
    this.props.onSelect(day);
    this.hide();
  }

  getUniqueIdentifier() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }

  setMaxDate(date) {
    this.setState({ maxDate: date });
  }

  setMinDate(date) {
    this.setState({ minDate: date });
  }

  hideOnDocumentClick(e) {
    if (e.target.className !== 'date-picker-trigger-' + this.state.id && 
      !this.parentsHaveClassName(e.target, 'ardp-calendar-' + this.state.id)) {
        this.hide();
    }
  }

  parentsHaveClassName(element, className) {
    let parent = element;
    while (parent) {
      if (parent.className && parent.className.indexOf(className) > - 1) {
        return true;
      }

      parent = parent.parentNode;
    }
  }

  toggle() {
    this.calendarComponent.toggle();
  }

  hide() {
    this.calendarComponent.hide();
  }

  render() {
    return (
      <div className='ardp-date-picker'>
        <input
          type='text' 
          className={`date-picker-trigger-${this.state.id}`}
          readOnly
          value={toString(this.state.selected)}
          onClick={this.toggle} 
        />
        <Calendar
          ref={(calendarComponent => { this.calendarComponent = calendarComponent; })}
          id={this.state.id}
          view={this.state.view}
          selected={this.state.selected}
          onSelect={this.onSelect}
          minDate={this.state.minDate}
          maxDate={this.state.maxDate}
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  selected: React.PropTypes.string,
  onSelect: React.PropTypes.func
};

export default DatePicker;