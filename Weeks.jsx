import React from 'react';
import { clone, moveToDayOfWeek } from './utils/DateUtilities';
import Week from './Week';

export class Weeks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: clone(this.props.view),
      other: clone(this.props.view),
      sliding: null
    };

    this.onTransitionend = this.onTransitionEnd.bind(this);
  }

  componentDidMount() {
    this.divCurrent.addEventListener('transitionend', this.onTransitionend);
  }

  onTransitionEnd() {
    this.setState({
      sliding: null, 
      view: clone(this.state.other)
    });

    this.props.onTransitionEnd();
  }
  
  getWeekStartDates(view) {
    view.setDate(1);
    view = moveToDayOfWeek(clone(view), 0);

    const current = clone(view);
    current.setDate(current.getDate() + 7);

    const starts = [view];
    const month = current.getMonth();
    
    while(current.getMonth() === month) {
      starts.push(clone(current));
      current.setDate(current.getDate() + 7);
    }

    return starts;
  }

  moveTo(view, isForward) {
    this.setState({
      sliding: isForward ? 'left' : 'right',
      other: clone(view)
    });
  }

  renderWeeks(view) {
    const starts = this.getWeekStartDates(view);
    const month = starts[1].getMonth();

    return starts.map((s, key) => (
      <Week 
        key={key}
        start={s}
        month={month}
        selected={this.props.selected}
        onSelect={this.props.onSelect}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
      />
    ));
  }

  render() {
    const classCurrentOther = this.state.sliding ? `sliding ${this.state.sliding}` : '';
    return (
      <div className='weeks'>
        <div
          ref={(divCurrent) => { this.divCurrent = divCurrent; }}
          className={`current ${classCurrentOther}`}
        >
          {this.renderWeeks(this.state.view)}
        </div>
        <div
          ref={(divOther => { this.divOther = divOther; })}
          className={`other ${classCurrentOther}`}
        >
          {this.renderWeeks(this.state.other)}
        </div>
      </div>
    );
  }
}

Weeks.propTypes = {
  onTransitionEnd: React.PropTypes.func,
  view:            React.PropTypes.object,
  selected:        React.PropTypes.object,
  onSelect:        React.PropTypes.func,
  minDate:         React.PropTypes.object,
  maxDate:         React.PropTypes.object
};

export default Weeks;