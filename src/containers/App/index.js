import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMessages } from './../../actions';
import { Cui } from '../Cui';
import { Messages, Choices, TextInput } from '../Cui/widgets';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    msgs: PropTypes.array.isRequired,
  };

  addMsg = msg => this.props.dispatch(addMessages([msg]));

  render() {
    return (
      <Cui msgs={this.props.msgs}>
        <Messages delay={500} />
        <Choices addMessage={this.addMsg} />
        <TextInput addMessage={this.addMsg} />
      </Cui>
    );
  }
}

export default connect(state => ({ msgs: state.messages }))(App);
