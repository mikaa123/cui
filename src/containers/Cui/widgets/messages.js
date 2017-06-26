import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cuiConnect from '../core/cuiConnect';

const CuiBusyTyping = cuiConnect(state => ({ isBusy: state.isBusy }))(
  class BusyTyping extends Component {
    static propTypes = {
      isBusy: PropTypes.bool.isRequired,
    };

    render() {
      if (this.props.isBusy) {
        return (
          <div className="cui-typing">
            ...
          </div>
        );
      }
      return null;
    }
  }
);

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
    let delay = this.props.delay || 1000;
    if (msg.user) {
      delay = 0;
    }
    setTimeout(() => {
      this.props.processMsg(msg);
    }, delay);
  }

  renderMessages() {
    return this.props.msgs.map(m => {
      if (m.user) {
        return <MessageUser msg={m} key={m.id} />;
      }
      return <MessageBot msg={m} key={m.id} />;
    });
  }

  render() {
    return (
      <div>
        {this.renderMessages()}
        <CuiBusyTyping />
      </div>
    );
  }
}

export default cuiConnect((state, processMsg) => ({
  msgs: state.msgs,
  currentMsg: state.currentMsg,
  processMsg,
}))(Messages);
