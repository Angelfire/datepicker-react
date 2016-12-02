import React from 'react';
import { clone, isSameDay, isBefore, isAfter, toDayOfMonthString } from './utils/DateUtilities';

export class Week extends React.Component {
  onSelect(day) {
    return () => {
      if (!this.isDisabled(day)) {
        this.props.onSelect(day);
      }
    };
  }

  getDayClassName(day) {
    let className = 'day';

    if (isSameDay(day, new Date())) {
      className = `${className} today`;
    }
    if (this.props.month !== day.getMonth()) {
      className = `${className} other-month`;
    }
    if (this.props.selected && isSameDay(day, this.props.selected)) {
      className = `${className} selected`;
    }
    if(this.isDisabled(day)) {
      className = `${className} disabled`;
    }

    return className;
  }

  isOtherMonth(day) {
    return this.props.month !== day.month();
  }

  buildDays(start) {
    const days = [clone(start)];
    let cloneTwo = clone(start);

    for (let i = 1; i <= 6; i++) {
      cloneTwo = clone(cloneTwo);
      cloneTwo.setDate(cloneTwo.getDate() + 1);
      days.push(cloneTwo);
    }

    return days;
  }

  isDisabled(day) {
    const minDate = this.props.minDate;
    const maxDate = this.props.maxDate;

    return (minDate && isBefore(day, minDate)) || (maxDate && isAfter(day, maxDate));
  }

  render() {
    const days = this.buildDays(this.props.start);

    return (
      <div className='week'>
        {days.map((day, i) => (
          <button
            type='button'
            className={this.getDayClassName(day)}
            key={i}
            onClick={this.onSelect(day)}
          >
            {toDayOfMonthString(day)}
          </button>
        ))}
      </div>
    );
  }
}

Week.propTypes = {
  selected: React.PropTypes.object,
  minDate:  React.PropTypes.object,
  maxDate:  React.PropTypes.object,
  onSelect: React.PropTypes.func,
  month:    React.PropTypes.number,
  start:    React.PropTypes.object
};

export default Week;