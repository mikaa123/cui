import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMessages } from './../../actions';
import { Cui, CuiPanel } from '../Cui/src';
import { Choices, TextInput } from '../Cui/src/widgets';
import MessagesTyping from './messagesTyping';
import TextInputAutocomplete from './TextInputAutocomplete';
import MovieFinder from './MovieFinder';
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
      // { type: 'STEP_REF', ref: 'bored' },
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

  onValue = (...params) => {
    this.state.step.onValue(...params);
  };

  onChoice = (c, ref) => {
    this.state.step.onValue(c, ref);
  };

  renderInput() {
    if (!this.state.step) {
      return null;
    }
    if (this.state.step.type === 'STEP_ANSWER') {
      return <TextInput onText={this.onValue} />;
    } else if (this.state.step.type === 'STEP_ASK') {
      return (
        <TextInputAutocomplete
          appID="XNIYVXANUC"
          apiKey="323d115ab6d407b0863f693285cb58e0"
          indexName="seo_steps"
          onText={this.onValue}
          topic={this.state.step.topic}
        />
      );
    } else if (this.state.step.type === 'STEP_CHOOSE_MOVIE') {
      return (
        <MovieFinder
          appID="latency"
          apiKey="6be0576ff61c053d5f9a3225e2a90f76"
          indexName="movies"
          onValue={this.onValue}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div className="wrapper">
        <Cui msgs={this.props.msgs} addMessage={this.addMessage}>
          <CuiPanel>
            <MessagesTyping />
            <Choices onChoice={this.onChoice} />
          </CuiPanel>
          {this.renderInput()}
          {this.state.step && this.state.step.type !== 'STEP_CHOOSE_MOVIE'
            ? <div className="push" />
            : null}
        </Cui>
      </div>
    );
  }
}

export default connect(state => ({ msgs: state.messages }))(App);
