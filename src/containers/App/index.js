import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMessages } from './../../actions';
import { Cui } from '../Cui';
import { Messages, Choices, TextInput } from '../Cui/widgets';
import ScriptManager from './scriptManager';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    msgs: PropTypes.array.isRequired,
  };

  state = {
    step: null,
  };

  componentDidMount() {
    this.scriptManager = new ScriptManager(
      msgs => this.props.dispatch(addMessages(msgs)),
      this.onStep
    );
    this.scriptManager.nextStep();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (!prevState.step && this.state.step) ||
      (this.state.step && prevState.step.id !== this.state.step.id)
    ) {
      this.state.step.process();
    }
  }

  onStep = step => {
    this.setState({ step });
  };

  addMsg = msg => this.props.dispatch(addMessages([msg]));

  render() {
    return (
      <Cui msgs={this.props.msgs}>
        <Messages />
        <Choices
          addMessage={msg => {
            this.addMsg(msg);
            if (this.state.step) {
              this.state.step.onChoice(msg.value);
            }
          }}
        />
        <TextInput
          addMessage={msg => {
            this.addMsg(msg);
            if (this.state.step) {
              this.state.step.onText(msg.value);
            }
          }}
        />
      </Cui>
    );
  }
}

export default connect(state => ({ msgs: state.messages }))(App);
