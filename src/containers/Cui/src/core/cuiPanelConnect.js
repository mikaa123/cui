import React, { Component } from 'react';
import PropTypes from 'prop-types';

const cuiPanelConnect = (mergeProps = ctx => ctx) => Cmp =>
  class CuiCmp extends Component {
    static contextTypes = {
      onMsg: PropTypes.func.isRequired,
    };
    render() {
      const props = {
        ...this.props,
        ...mergeProps(this.context.onMsg),
      };
      return <Cmp {...props} />;
    }
  };

export default cuiPanelConnect;
