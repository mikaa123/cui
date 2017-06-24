import React, { Component } from 'react';
import PropTypes from 'prop-types';

const cuiConnect = (mergeProps = ctx => ctx) => Cmp =>
  class CuiCmp extends Component {
    static contextTypes = {
      state: PropTypes.object.isRequired,
    };
    render() {
      const props = { ...this.props, ...mergeProps(this.context.state) };
      return <Cmp {...props} />;
    }
  };

export default cuiConnect;
