import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cuiConnect from '../core/cuiConnect';

class Typing extends Component {
  render() {
    return (
      <div className="cui-typing">
        ...
      </div>
    );
  }
}

class MessageBot extends Component {
  static propTypes = {
    msg: PropTypes.object.isRequired,
    processMsg: PropTypes.func.isRequired,
    delay: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      isTyping: true,
      values: [],
    };
  }

  typeMsg() {
    const value = this.props.msg.values.shift();
    const delay = this.props.delay || value.length / (800 / 60) * 1000;
    this.setState({
      isTyping: true,
    });
    setTimeout(() => {
      this.setState(state => ({
        isTyping: false,
        values: state.values.concat(value),
      }));
      if (!this.props.msg.values.length) {
        this.props.processMsg(this.props.msg);
        return;
      }
      this.typeMsg();
    }, delay);
  }

  componentDidMount() {
    this.typeMsg();
  }

  render() {
    return (
      <div className="cui-message cui-message--bot">
        <img src={this.props.msg.avatar} />
        {this.state.values.map(v => v)}
        {this.state.isTyping ? <Typing /> : null}
      </div>
    );
  }
}

class MessageUser extends Component {
  static propTypes = {
    msg: PropTypes.object.isRequired,
    processMsg: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.processMsg(this.props.msg);
  }

  render() {
    return (
      <div className="cui-message cui-message--user">
        {this.props.msg.values[0]}
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

  renderMessages() {
    let msgs = this.props.msgs;
    if (this.props.currentMsg) {
      msgs = msgs.concat(this.props.currentMsg);
    }
    return msgs.map(m => {
      if (m.type === 'user') {
        return (
          <MessageUser msg={m} key={m.id} processMsg={this.props.processMsg} />
        );
      } else if (m.type === 'bot') {
        return (
          <MessageBot
            msg={m}
            key={m.id}
            delay={this.props.delay}
            processMsg={this.props.processMsg}
          />
        );
      }
      return null;
    });
  }

  render() {
    return (
      <div>
        {this.renderMessages()}
      </div>
    );
  }
}

export default cuiConnect((state, processMsg) => ({
  msgs: state.msgs,
  currentMsg: state.currentMsg,
  processMsg,
}))(Messages);
