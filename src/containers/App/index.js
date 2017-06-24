import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cui from '../Cui';
import { addMessages } from './../../actions';

class ChatBox extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      msg: '',
    };
  }

  handleChange = e => {
    this.setState({ msg: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(
      addMessages([
        {
          id: this.state.msg,
          msg: this.state.msg,
          user: true,
        },
      ])
    );
    this.setState({ msg: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.msg}
          onChange={this.handleChange}
          disabled={this.state.disabled}
        />
      </form>
    );
  }
}

const ConnectedChatbox = connect()(ChatBox);

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    msgs: PropTypes.array.isRequired,
  };

  render() {
    return (
      <Cui msgs={this.props.msgs} delay={500}>
        <ConnectedChatbox />
      </Cui>
    );
  }
}

export default connect(state => ({ msgs: state.messages }))(App);
