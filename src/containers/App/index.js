import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMessages } from './../../actions';
import { Cui, CuiPanel } from '../Cui/src';
import { Messages, Choices, TextInput } from '../Cui/src/widgets';
import ScriptManager from './scriptManager';
import '../Cui/theme/style.scss';
import './style.scss';

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
      (this.state.step && prevState.step.objectID !== this.state.step.objectID)
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
      <div className="wrapper">
        <Cui msgs={this.props.msgs}>
          <CuiPanel>
            <Messages />
            <Choices
              addMessage={msg => {
                this.addMsg(msg);
                if (this.state.step) {
                  this.state.step.onChoice(msg.values);
                }
              }}
            />
          </CuiPanel>
          <TextInput
            addMessage={msg => {
              this.addMsg(msg);
              if (this.state.step) {
                this.state.step.onText(msg.values);
              }
            }}
          />
        </Cui>
      </div>
    );
  }
}

export default connect(state => ({ msgs: state.messages }))(App);
