import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMessages } from './../../actions';
import { Cui, CuiPanel } from '../Cui/src';
import { Messages, Choices, TextInput } from '../Cui/src/widgets';
import TextInputAutocomplete from './TextInputAutocomplete';
import '../Cui/theme/style.scss';
import './style.scss';
import createChatInteraction from './interactions';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    msgs: PropTypes.array.isRequired,
  };

  state = {
    step: null,
  };

  componentDidMount() {
    this.mainSequence = createChatInteraction(
      { type: 'STEP_REF', ref: 'intro' },
      {},
      {
        addMessage: this.addMessage,
        onStep: this.onStep,
      }
    );
    this.mainSequence.process();
  }

  addMessage = msg => this.props.dispatch(addMessages([msg]));

  onStep = step => {
    this.setState({ step });
  };

  onValue = (msg, ref) => {
    this.state.step.onValue(msg, ref);
  };

  onChoice = (c, ref) => {
    this.state.step.onValue(c, ref);
  };

  renderInput() {
    if (!this.state.step) {
      return null;
    }
    if (this.state.step.type === 'STEP_ANSWER') {
      return <TextInput onText={this.onValue} addMessage={this.addMessage} />;
    } else if (this.state.step.type === 'STEP_ASK') {
      return (
        <TextInputAutocomplete
          appID="XNIYVXANUC"
          apiKey="323d115ab6d407b0863f693285cb58e0"
          indexName="seo_steps"
          onText={this.onValue}
          addMessage={this.addMessage}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div className="wrapper">
        <Cui msgs={this.props.msgs}>
          <CuiPanel>
            <Messages delay={300} />
            <Choices onChoice={this.onChoice} addMessage={this.addMessage} />
          </CuiPanel>
          {this.renderInput()}
        </Cui>
      </div>
    );
  }
}

export default connect(state => ({ msgs: state.messages }))(App);
