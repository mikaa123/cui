import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import { addMessages } from '../../actions';
// import './style.scss'

class Query extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    triggerNextStep: PropTypes.func,
  };

  componentWillMount() {
    setTimeout(() => {
      this.props.dispatch(
        addMessages([
          {
            id: 'dac',
            message: 'byee',
            end: true,
          },
        ])
      );
      this.props.triggerNextStep({ trigger: 'dac' });
    }, 2000);
  }

  render() {
    return <div>gotcha</div>;
  }
}

const ConnectedQuery = connect()(Query);

class Chat extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
  };

  componentWillMount() {
    this.props.dispatch(
      addMessages([
        {
          id: 'hello-world',
          message: 'Hello World!',
          trigger: 'search',
        },
        {
          id: 'search',
          user: true,
          trigger: 'query',
        },
        {
          id: 'query',
          component: <ConnectedQuery />,
          waitAction: true,
          asMessage: true,
        },
      ])
    );
  }

  render() {
    if (!this.props.messages.length) {
      return null;
    }
    return <ChatBot steps={this.props.messages} />;
  }
}

export default connect(state => ({
  messages: state.messages,
}))(Chat);
