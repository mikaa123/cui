import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cuiConnect from '../core/cuiConnect';

class Choice extends Component {
  static propTypes = {
    currentMsg: PropTypes.object,
    processMsg: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
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
    this.props.addMessage({
      id: c.id,
      msg: c.val,
      type: 'user',
    });
    this.props.processMsg(this.props.currentMsg);
  };

  render() {
    if (!this.state.choices.length) {
      return null;
    }
    return (
      <div className="cui-choice">
        Choose:
        {this.state.choices.map(c =>
          <p key={c.id} onClick={() => this.handleChoice(c)}>{c.val}</p>
        )}
      </div>
    );
  }
}

export default cuiConnect((state, processMsg) => ({
  currentMsg: state.currentMsg,
  processMsg,
}))(Choice);
