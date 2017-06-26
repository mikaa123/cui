import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cui extends Component {
  static propTypes = {
    msgs: PropTypes.array.isRequired,
    children: PropTypes.PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.msgQueue = [...props.msgs];
    this.isProcessing = false;
    this.processedIDs = [];
    this.state = {
      isBusy: false,
      msgs: [],
      currentMsg: null,
    };
  }

  static childContextTypes = {
    state: PropTypes.object.isRequired,
    processMsg: PropTypes.func.isRequired,
  };

  getChildContext() {
    return { state: { ...this.state }, processMsg: this.processMsg };
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

  isProcessed(id) {
    return this.processedIDs[id];
  }

  processQueue() {
    if (!this.msgQueue.length) {
      this.setState({ currentMsg: null, isBusy: false });
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
    this.setState({ currentMsg: msg, isBusy: true });
  }

  processMsg = msg => {
    if (msg) {
      this.processedIDs[msg.id] = true;
      this.setState({
        msgs: this.state.msgs.concat(msg),
      });
    }
    this.isProcessing = false;
    this.processQueue();
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Cui;
