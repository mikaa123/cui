import React, { Component } from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch';
import { cuiConnect } from '../Cui/src';

class AutocompleteChoice extends Component {
  static propTypes = {
    step: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div
        className="ask-autocomplete cui-choice"
        onClick={() => this.props.handleClick(this.props.step)}
      >
        {this.props.step.question}
      </div>
    );
  }
}

class TextInputAutocomplete extends Component {
  static propTypes = {
    onText: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    appID: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
    topic: PropTypes.string,
    indexName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedStep: {},
      msg: '',
      steps: [],
    };
    const client = algoliasearch(props.appID, props.apiKey);
    this.index = client.initIndex(props.indexName);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.msg !== this.state.msg) {
      const filters = ['type: SEQUENCE_QUESTION'];
      if (nextProps.topic) {
        filters.push(`topic:${nextProps.topic}`);
      }
      this.index
        .search(nextState.msg, {
          filters: filters.join(' AND '),
        })
        .then(res => {
          this.setState({
            steps: res.hits.slice(0, 3),
          });
        });
    }
  }

  componentDidUpdate() {
    this.input.focus();
  }

  handleClick = step => {
    this.props.addMessage({
      id: step.question,
      values: [step.question],
      type: 'user',
    });
    this.props.onText(step.question, step);
  };

  handleChange = e => {
    if (e.target.value !== this.state.msg) {
      this.setState({ msg: e.target.value });
    }
  };

  render() {
    return (
      <div className="ask-autocomplete-wrapper">
        <div className="ask-autocomplete cui-choices">
          {this.state.steps.map(s =>
            <AutocompleteChoice
              key={s.objectID}
              step={s}
              handleClick={this.handleClick}
            />
          )}
        </div>
        <form className="cui-text-input" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            value={this.state.msg}
            onChange={this.handleChange}
            placeholder="Start typing..."
            ref={input => {
              this.input = input;
            }}
            autoFocus
          />
        </form>
      </div>
    );
  }
}

export default cuiConnect((state, processMsg, addMessage) => ({ addMessage }))(
  TextInputAutocomplete
);
