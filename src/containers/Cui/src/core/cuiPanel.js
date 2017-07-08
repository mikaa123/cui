import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Panel extends Component {
  static propTypes = {
    children: PropTypes.PropTypes.node.isRequired,
  };

  static childContextTypes = {
    onMsg: PropTypes.func.isRequired,
  };

  getChildContext() {
    return {
      onMsg: this.onMsg,
    };
  }

  onMsg = () => {
    if (this.panel) {
      this.panel.scrollTop = this.panel.scrollHeight;
    }
  };

  handleRef = panel => (this.panel = panel);

  render() {
    return (
      <div className="cui-panel" ref={this.handleRef}>
        {this.props.children}
      </div>
    );
  }
}

export default Panel;
