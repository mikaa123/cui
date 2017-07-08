import { InstantSearch, SearchBox, Hits } from 'react-instantsearch/dom';
import React from 'react';
import { Editor, EditorState } from 'draft-js';
import algoliasearch from 'algoliasearch';

const client = algoliasearch('XNIYVXANUC', 'f815a050dcf99d35dc894bc0f97c50cd');
const index = client.initIndex('seo_steps');

window.setTimeout(() => {
  index
    .saveObject({ objectID: 'whatIsSEO2', text: ['lolilol'] })
    .then(r => console.log('saved!', r));
}, 5000);

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
  }
  render() {
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    );
  }
}

class Builder extends React.Component {
  render() {
    return (
      <InstantSearch algoliaClient={client} indexName="seo_steps">
        <SearchBox />
        <Hits />
      </InstantSearch>
    );
  }
}

export default Builder;
