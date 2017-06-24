import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

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
  };

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
      </div>
    );
  }
}

export default Messages;
