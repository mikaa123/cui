import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cuiConnect from '../core/cuiConnect';

class TextInput extends Component {
  static propTypes = {
    addMessage: PropTypes.func.isRequired,
    isBusy: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      msg: '',
    };
  }

  componentDidUpdate() {
    if (!this.props.isBusy) {
      this.input.focus();
    }
  }

  handleChange = e => {
    this.setState({ msg: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addMessage({
      id: this.state.msg,
      values: [this.state.msg],
      type: 'user',
    });
    this.setState({ msg: '' });
  };

  render() {
    return (
      <form className="cui-text-input" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.msg}
          onChange={this.handleChange}
          disabled={this.props.isBusy}
          placeholder="Write your answer..."
          ref={input => {
            this.input = input;
          }}
        />
      </form>
    );
  }
}

export default cuiConnect(state => ({
  isBusy: state.isBusy,
}))(TextInput);
