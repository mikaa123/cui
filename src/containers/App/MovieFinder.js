import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InstantSearch } from 'react-instantsearch/dom';
import { connectSearchBox, connectHits } from 'react-instantsearch/connectors';

class Item extends Component {
  static propTypes = {
    hit: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
  };
  chooseValue = () => {
    this.props.handleClick(this.props.hit.title);
  };
  render() {
    return (
      <div className="finder-item" onClick={this.chooseValue}>
        <div className="finder-item__image">
          <img src={this.props.hit.image} />
        </div>
      </div>
    );
  }
}

const CustomHits = connectHits(
  class extends Component {
    static propTypes = {
      hits: PropTypes.array.isRequired,
      handleClick: PropTypes.func.isRequired,
    };
    render() {
      return (
        <div className="ais-Hits__root">
          {this.props.hits.map(h =>
            <Item
              hit={h}
              key={h.objectID}
              handleClick={this.props.handleClick}
            />
          )}
        </div>
      );
    }
  }
);

const ChatBox = connectSearchBox(
  class ChatBox extends Component {
    static propTypes = {
      refine: PropTypes.func.isRequired,
    };

    search = e => this.props.refine(e.target.value);

    render() {
      return (
        <form className="cui-text-input" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            onChange={this.search}
            placeholder="Start typing..."
            ref={input => {
              this.input = input;
            }}
            autoFocus
          />
        </form>
      );
    }
  }
);

class MovieFinder extends Component {
  static propTypes = {
    onValue: PropTypes.func.isRequired,
    appID: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
    indexName: PropTypes.string.isRequired,
  };

  handleClick = title => {
    this.props.onValue(title);
  };

  render() {
    return (
      <div
        className="movie-finder-wrapper"
        ref={elt => {
          this.elt = elt;
        }}
      >
        <InstantSearch
          appId={this.props.appID}
          apiKey={this.props.apiKey}
          indexName={this.props.indexName}
        >
          <div className="movie-finder__chatbox">
            <ChatBox />
            <div
              className="ask-autocomplete__cancel cui-choice movie-finder__toggle"
              style={{ marginLeft: 10, background: '#FC4F81' }}
              onClick={() =>
                this.elt.style['flex-basis'] === '100vh'
                  ? (this.elt.style['flex-basis'] = '60vh')
                  : (this.elt.style['flex-basis'] = '100vh')}
            >
              Toggle
            </div>
          </div>
          <CustomHits handleClick={this.handleClick} />
        </InstantSearch>
      </div>
    );
  }
}

export default MovieFinder;
