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
        dangerouslySetInnerHTML={{
          __html: this.props.step._highlightResult.question.value,
        }}
      />
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
      this.search(nextProps.topic, nextState.msg);
    }
  }

  componentDidMount() {
    this.search(this.props.topic, this.state.msg);
  }

  componentDidUpdate() {
    this.input.focus();
  }

  search(topic, msg) {
    const filters = ['type: SEQUENCE_QUESTION'];
    if (topic) {
      filters.push(`topic:${topic}`);
    }
    this.index
      .search(msg, {
        filters: filters.join(' AND '),
      })
      .then(res => {
        this.setState({
          steps: res.hits.slice(0, 3),
        });
      });
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
          <div
            className="ask-autocomplete__cancel cui-choice"
            style={{ marginLeft: 10, background: '#FC4F81' }}
            onClick={() => this.props.onText(null, null, true)}
          >
            Cancel
          </div>
        </form>
      </div>
    );
  }
}

export default cuiConnect((state, processMsg, addMessage) => ({ addMessage }))(
  TextInputAutocomplete
);
