import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cuiConnect from '../core/cuiConnect';

class Choice extends Component {
  static propTypes = {
    currentMsg: PropTypes.object,
    processMsg: PropTypes.func.isRequired,
    onChoice: PropTypes.func.isRequired,
  };

  state = {
    choices: [],
  };

  componentWillReceiveProps(nextProps) {
    const msg = nextProps.currentMsg;
    if (!msg || msg.type !== 'choice') {
      this.setState({ choices: [] });
      return;
    }
    if (msg.choices) {
      this.setState({ choices: msg.choices });
    }
  }

  handleChoice = c => {
    this.props.onChoice(
      {
        id: c.val,
        values: [c.val],
        type: 'user',
      },
      c.next
    );
    this.props.processMsg(this.props.currentMsg);
  };

  render() {
    if (!this.state.choices.length) {
      return null;
    }
    return (
      <div className="cui-choices">
        {this.state.choices.map(c =>
          <div
            className="cui-choice"
            key={c.val}
            onClick={() => this.handleChoice(c)}
          >
            {c.val}
          </div>
        )}
      </div>
    );
  }
}

export default cuiConnect((state, processMsg) => ({
  currentMsg: state.currentMsg,
  processMsg,
}))(Choice);
