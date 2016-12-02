import React from 'react';
import { clone, toMonthAndYearString } from './utils/DateUtilities';

export class MonthHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: clone(this.props.view),
      enabled: true
    };

    this.moveBackward = this.moveBackward.bind(this);
    this.moveForward = this.moveForward.bind(this);
  }

  move(view, isForward) {
    if(!this.state.enabled) {
      return;
    }

    this.setState({
      view,
      enabled: false
    });

    this.props.onMove(view, isForward);
  }

  moveBackward() {
    const view = clone(this.state.view);
    view.setMonth(view.getMonth() - 1);
    this.move(view, false);
  }

  moveForward() {
    const view = clone(this.state.view);
    view.setMonth(view.getMonth() + 1);
    this.move(view, true);
  }

	enable() {
    this.setState({ enabled: true });
  }

  render() {
    const enabled = this.state.enabled;
    const enabledClass = enabled ? '' : ' disabled';

    return (
      <div className='month-header'>
        <button
          type='button'
          className={enabledClass}
          onClick={this.moveBackward}
        >
          {String.fromCharCode(9664)}
        </button>
        <span>
          {toMonthAndYearString(this.state.view)}
        </span>
        <button
          type='button'
          className={enabledClass}
          onClick={this.moveForward}
        >
          {String.fromCharCode(9654)}
        </button>
      </div>
    );
  }
}

MonthHeader.propTypes = {
  onMove: React.PropTypes.func,
  view:   React.PropTypes.object
};

export default MonthHeader;