import React, { Component } from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch';

class AutocompleteChoice extends Component {
  static propTypes = {
    step: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div
        className="ask-autocomplete"
        onClick={() => this.props.handleClick(this.props.step)}
      >
        {this.props.step.questions[0]}
      </div>
    );
  }
}

class TextInputAutocomplete extends Component {
  static propTypes = {
    onText: PropTypes.func.isRequired,
    appID: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
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
      this.index
        .search(nextState.msg, {
          filters: 'type: openQuestion',
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
    this.setState({ selectedStep: step, msg: step.questions[0] });
  };

  handleChange = e => {
    if (e.target.value !== this.state.msg) {
      this.setState({ msg: e.target.value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.selectedStep) {
      return;
    }
    this.props.onText(
      {
        id: this.state.msg,
        values: [this.state.msg],
        type: 'user',
      },
      this.state.selectedStep.objectID
    );
  };

  render() {
    return (
      <div className="ask-autocomplete-wrapper">
        <div className="ask-autocomplete">
          {this.state.steps.map(s =>
            <AutocompleteChoice
              key={s.objectID}
              step={s}
              handleClick={this.handleClick}
            />
          )}
        </div>
        <form className="cui-text-input" onSubmit={this.handleSubmit}>
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

export default TextInputAutocomplete;
