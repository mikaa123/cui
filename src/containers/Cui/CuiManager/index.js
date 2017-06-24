import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Messages from './Messages';

class TypingMessage extends Component {
  render() {
    return (
      <div className="cui-typing">
        ...
      </div>
    );
  }
}

class Choice extends Component {
  static propTypes = {
    msg: PropTypes.object.isRequired,
  };

  handleChoice = c => {
    this.props.msg.process({
      id: c.id,
      msg: c.val,
      user: true,
    });
  };

  render() {
    return (
      <div className="cui-choice">
        Choose:
        {this.props.msg.choices.map(c =>
          <p key={c.id} onClick={() => this.handleChoice(c)}>{c.val}</p>
        )}
      </div>
    );
  }
}

class ReadMode {
  transition(ctx, msg) {
    ctx.setState({
      disabled: true,
      isTyping: true,
      choiceMsg: null,
    });

    setTimeout(() => {
      ctx.setState({
        isTyping: false,
      });
      msg.process();
    }, ctx.props.delay || 0);
  }
}

class ChoiceMode {
  transition(ctx, msg) {
    ctx.setState({
      disabled: false,
      isTyping: false,
    });

    setTimeout(() => {
      ctx.setState({
        choiceMsg: msg,
      });
    }, ctx.props.delay || 0);
  }
}

const MODE = {
  choice: new ChoiceMode(),
  read: new ReadMode(),
};

class CuiManager extends Component {
  static propTypes = {
    msgs: PropTypes.array.isRequired,
    currentMsg: PropTypes.object,
    delay: PropTypes.number,
    children: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);
    this.mode = null;
    this.state = {
      msg: '',
      disabled: true,
      isTyping: false,
      choiceMsg: false,
    };
  }

  componentDidMount() {
    this.setMode(this.props.currentMsg);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentMsg !== nextProps.currentMsg) {
      this.setMode(nextProps.currentMsg);
    }
  }

  setMode(msg) {
    if (!msg) {
      return;
    }
    if (msg.choices) {
      this.mode = MODE.choice;
    } else {
      this.mode = MODE.read;
    }
    this.mode.transition(this, msg);
  }

  render() {
    return (
      <div>
        <Messages msgs={this.props.msgs} />
        {this.state.choiceMsg ? <Choice msg={this.state.choiceMsg} /> : null}
        {this.state.isTyping ? <TypingMessage /> : null}
        {this.props.children}
      </div>
    );
  }
}

export default CuiManager;
