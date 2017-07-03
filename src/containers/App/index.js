import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMessages } from './../../actions';
import { Cui, CuiPanel, cuiConnect } from '../Cui/src';
import { Messages, Choices, TextInput } from '../Cui/src/widgets';
import ScriptManager from './scriptManager';
import TextInputAutocomplete from './TextInputAutocomplete';
import '../Cui/theme/style.scss';
import './style.scss';

const HiddenIfBusy = cuiConnect(state => ({ isBusy: state.isBusy }))(
  class HiddenIfBusy extends Component {
    static propTypes = {
      isBusy: PropTypes.bool.isRequired,
      conditions: PropTypes.bool,
      children: PropTypes.node.isRequired,
    };
    render() {
      return (
        <div
          style={
            this.props.isBusy || this.props.conditions
              ? { display: 'none' }
              : null
          }
        >
          {this.props.children}
        </div>
      );
    }
  }
);

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
    this.scriptManager.nextStep('greetings');
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

  onValue = (msg, next) => {
    this.props.dispatch(addMessages([msg]));
    this.state.step.onValue(msg.values[0], next);
  };

  render() {
    return (
      <div className="wrapper">
        <Cui msgs={this.props.msgs}>
          <CuiPanel>
            <Messages delay={100} />
            <Choices onChoice={this.onValue} />
          </CuiPanel>
          <HiddenIfBusy
            conditions={Boolean(
              !this.state.step ||
                (this.state.step.type !== 'question' &&
                  this.state.step.type !== 'askOpenQuestion')
            )}
          >
            {this.state.step && this.state.step.ask
              ? <TextInputAutocomplete
                  appID="XNIYVXANUC"
                  apiKey="323d115ab6d407b0863f693285cb58e0"
                  indexName="seo_steps"
                  onText={this.onValue}
                />
              : <TextInput onText={this.onValue} />}
          </HiddenIfBusy>
        </Cui>
      </div>
    );
  }
}

export default connect(state => ({ msgs: state.messages }))(App);
