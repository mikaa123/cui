import React, { Component } from 'react';
import PropTypes from 'prop-types';

const cuiConnect = (mergeProps = ctx => ctx) => Cmp =>
  class CuiCmp extends Component {
    static contextTypes = {
      state: PropTypes.object.isRequired,
      processMsg: PropTypes.func.isRequired,
      addMessage: PropTypes.func.isRequired,
    };
    render() {
      const props = {
        ...this.props,
        ...mergeProps(
          this.context.state,
          this.context.processMsg,
          this.context.addMessage
        ),
      };
      return <Cmp {...props} />;
    }
  };

export default cuiConnect;
