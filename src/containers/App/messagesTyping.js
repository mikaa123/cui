import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cuiConnect, cuiPanelConnect } from '../Cui/src';
import Typist from 'react-typist';
import Remarkable from 'remarkable';
import reactHtmlParser from 'react-html-parser';

const md = new Remarkable();

class MessageBot extends Component {
  static propTypes = {
    msg: PropTypes.object.isRequired,
    processMsg: PropTypes.func.isRequired,
    onMsg: PropTypes.func.isRequired,
    delay: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      isTyping: false,
      values: [],
    };
  }

  componentDidMount() {
    this.typeNextValue();
  }

  componentDidUpdate() {
    this.props.onMsg();
  }

  typeNextValue = () => {
    const value = this.props.msg.values.shift();
    if (!value) {
      this.props.processMsg(this.props.msg);
      return;
    }
    setTimeout(() => {
      this.setState(
        state => ({
          values: state.values.concat(value),
          isTyping: true,
        }),
        () => this.props.onMsg()
      );
    }, isNaN(this.props.msg.delay) ? Math.floor(Math.random() * (800 - 1)) : this.props.msg.delay);
  };

  render() {
    if (!this.state.isTyping) {
      return null;
    }
    return (
      <div className="cui-sequence cui-sequence--bot">
        <div className="cui-avatar">
          <img src={this.props.msg.avatar} />
        </div>
        <div className="cui-sequence__messages">
          {this.state.values.map(v =>
            <div className="cui-message-wrapper" key={v}>
              <div className="cui-message">
                <Typist
                  onTypingDone={this.typeNextValue}
                  cursor={{ show: false }}
                  avgTypingDelay={40}
                  onCharacterTyped={this.props.onMsg}
                >
                  {reactHtmlParser(md.render(v))}
                </Typist>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

class MessageUser extends Component {
  static propTypes = {
    msg: PropTypes.object.isRequired,
    processMsg: PropTypes.func.isRequired,
    onMsg: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.processMsg(this.props.msg);
    this.props.onMsg();
  }

  render() {
    return (
      <div className="cui-sequence cui-sequence--user">
        <div className="cui-sequence__messages">
          <div className="cui-message-wrapper">
            <div className="cui-message">
              {this.props.msg.values[0]}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Messages extends Component {
  static propTypes = {
    msgs: PropTypes.array.isRequired,
    currentMsg: PropTypes.object,
    processMsg: PropTypes.func.isRequired,
    onMsg: PropTypes.func.isRequired,
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
          <MessageUser
            msg={m}
            key={m.id}
            processMsg={this.props.processMsg}
            onMsg={this.props.onMsg}
          />
        );
      } else if (m.type === 'bot') {
        return (
          <MessageBot
            msg={m}
            key={m.id}
            delay={this.props.delay}
            processMsg={this.props.processMsg}
            onMsg={this.props.onMsg}
          />
        );
      }
      return null;
    });
  }

  handleRef = msgContainer => (this.msgContainer = msgContainer);

  render() {
    return (
      <div className="cui-messages" ref={this.handleRef}>
        {this.renderMessages()}
      </div>
    );
  }
}

export default cuiConnect((state, processMsg) => ({
  msgs: state.msgs,
  currentMsg: state.currentMsg,
  processMsg,
}))(cuiPanelConnect(onMsg => ({ onMsg }))(Messages));
