import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cuiConnect from '../core/cuiConnect';

const DEFAULT_DELAY = 1000;

class BusyTyping extends Component {
  static propTypes = {
    isTyping: PropTypes.bool.isRequired,
  };

  render() {
    if (this.props.isTyping) {
      return (
        <div className="cui-typing">
          ...
        </div>
      );
    }
    return null;
  }
}

class MessageBot extends Component {
  static propTypes = {
    msg: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="cui-message cui-message--bot">
        {this.props.msg.msg}
      </div>
    );
  }
}

class MessageUser extends Component {
  static propTypes = {
    msg: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="cui-message cui-message--user">
        {this.props.msg.msg}
      </div>
    );
  }
}

class Messages extends Component {
  static propTypes = {
    msgs: PropTypes.array.isRequired,
    currentMsg: PropTypes.object,
    processMsg: PropTypes.func.isRequired,
    delay: PropTypes.number,
  };

  state = {
    isTyping: false,
  };

  componentDidMount() {
    this.handleMsg(this.props.currentMsg);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentMsg !== nextProps.currentMsg) {
      this.handleMsg(nextProps.currentMsg);
    }
  }

  handleMsg(msg) {
    if (!msg) {
      return;
    }
    if (msg.type !== 'user' && msg.type !== 'bot') {
      return;
    }
    let delay = this.props.delay || DEFAULT_DELAY;
    this.setState({ isTyping: true });
    if (msg.type === 'user') {
      delay = 0;
    }
    setTimeout(() => {
      this.setState({ isTyping: false });
      this.props.processMsg(msg);
    }, delay);
  }

  renderMessages() {
    return this.props.msgs.map(m => {
      if (m.type === 'user') {
        return <MessageUser msg={m} key={m.id} />;
      } else if (m.type === 'bot') {
        return <MessageBot msg={m} key={m.id} />;
      }
      return null;
    });
  }

  render() {
    console.log(this.state.isTyping);
    return (
      <div>
        {this.renderMessages()}
        <BusyTyping isTyping={this.state.isTyping} />
      </div>
    );
  }
}

export default cuiConnect((state, processMsg) => ({
  msgs: state.msgs,
  currentMsg: state.currentMsg,
  processMsg,
}))(Messages);
