import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CuiManager from './CuiManager';

class Cui extends Component {
  static propTypes = {
    msgs: PropTypes.array.isRequired,
    delay: PropTypes.number,
    children: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);
    this.msgQueue = [...props.msgs];
    this.isProcessing = false;
    this.state = {
      processedMsgs: [],
      currentMsg: null,
    };
  }

  componentDidMount() {
    this.processQueue();
  }

  componentWillReceiveProps(nextProps) {
    this.msgQueue = this.msgQueue.concat(
      nextProps.msgs.filter(m => !this.isProcessed(m.id))
    );
    this.processQueue();
  }

  processReadMsg = msg => () => {
    this.processMsg(msg);
  };

  processChoiceMsg = () => msg => {
    this.msgQueue.unshift(msg);
    this.processMsg(null);
  };

  decorateMsg(msg) {
    const decoratedMsg = Object.assign({}, msg);
    if (msg.choices) {
      decoratedMsg.process = this.processChoiceMsg();
    } else {
      decoratedMsg.process = this.processReadMsg(msg);
    }
    return decoratedMsg;
  }

  isProcessed(id) {
    return this.state.processedMsgs.some(p => p.id === id);
  }

  processQueue() {
    if (!this.msgQueue.length) {
      return;
    }
    if (this.isProcessing) {
      return;
    }
    const msg = this.msgQueue.shift();
    if (this.isProcessed(msg.id)) {
      return;
    }
    this.isProcessing = true;
    this.setState({ currentMsg: this.decorateMsg(msg) });
  }

  processMsg(msg) {
    if (msg) {
      this.setState({
        processedMsgs: this.state.processedMsgs.concat(msg),
      });
    }
    this.isProcessing = false;
    this.processQueue();
  }

  render() {
    return (
      <CuiManager
        msgs={this.state.processedMsgs}
        currentMsg={this.state.currentMsg}
        delay={this.props.delay}
      >
        {this.props.children}
      </CuiManager>
    );
  }
}

export default Cui;
