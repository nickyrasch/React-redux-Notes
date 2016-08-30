/* Created by alexdemars94 on 8/30/16. */

// React Stuff
import React from 'react'
import { Panel, Button } from 'react-bootstrap'

// Draft JS Stuff
import { Editor, EditorState, RichUtils } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

const styles = {
  root: {
    fontSize: 14,
    padding: 20
  },
  editor: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '8px',
    cursor: 'text',
    fontSize: 16,
    marginTop: 20,
    minHeight: 200,
    paddingTop: 20,
  }
}

class ReactSimpleRTE extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  focus = () => this.refs.editor.focus();

  onChange = (editorState) => {
    this.setState({ editorState })
  }

  onExportHTML = (editorState) => {
    let html = stateToHTML(editorState.getCurrentContent());
    console.log("HTML:", html)
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onItalicsClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  render() {
    const {editorState} = this.state

    return (
      <Panel bsStyle='primary' header="Draft.js Editor"
             style={{ alignSelf: 'stretch', alignItems: 'stretch', width: '100%' }}>
        <div style={ styles.root }>
          <div style={ styles.editor } onClick={ this.focus }>
            <Editor
              editorState={ editorState }
              onChange={ this.onChange }
              placeholder={ 'Write something...' }
              ref={ 'editor' }
            />
          </div>
          <Button onClick={ () => this._onBoldClick() }>Bold</Button>
          <Button onClick={ () => this._onItalicsClick() }>Italics</Button>
          <Button onClick={ () => this.onExportHTML(editorState) }>Export</Button>
        </div>
      </Panel>
    )
  }
}

module.exports = ReactSimpleRTE
