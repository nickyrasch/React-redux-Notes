/* Created by alexdemars94 on 8/30/16. */

// React Stuff
import React from 'react'
import { Panel, Button } from 'react-bootstrap'

// Draft JS Stuff
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

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
  },
  controls: {
    fontFamily: '\'Helvetica\', sans-serif',
    fontSize: 14,
    marginBottom: 10,
    userSelect: 'none',
  },
  styleButton: {
    color: '#999',
    cursor: 'pointer',
    marginRight: 16,
    padding: '2px 0',
  },
}

const colors = [
  { label: 'Red', style: 'red' },
  { label: 'Orange', style: 'orange' },
  { label: 'Green', style: 'green' },
  { label: 'Blue', style: 'blue' },
  { label: 'Grey', style: 'grey' }
]

const colorStyleMap = {
  red: {
    color: '#d9534f',
  },
  orange: {
    color: '#f0ad4e',
  },
  green: {
    color: '#5cb85c',
  },
  blue: {
    color: '#428bca',
  },
  grey: {
    color: '#e7e7e7'
  }
}

const ColorControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle()
  return (
    <div style={ styles.controls }>
      {colors.map(type =>
        <StyleButton
          active={ currentStyle.has(type.style) }
          label={ type.label }
          onToggle={ props.onToggle }
          key={ type.label }
          style={ type.style }
        />
      )}
    </div>
  );
};

class StyleButton extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let style
    if (this.props.active) {
      style = { ...styles.styleButton, ...colorStyleMap[this.props.style] }
    } else {
      style = styles.styleButton
    }

    return (
      <span style={style} onMouseDown={this.onToggle}>
        { this.props.label }
      </span>
    );
  }
}

class ReactSimpleRTE extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  focus = () => this.refs.editor.focus()

  onChange = (editorState) => this.setState({ editorState })

  onExportHTML = (editorState) => {
    // Get the style from the wrapper block and add it inline before exporting HTML
    let options = {
      inlineStyles: {
        // Override default <strong> tags.
        BOLD: { element: 'b' },
        // Use a custom inline color style.
        red    : { style: colorStyleMap.red },
        orange : { style: colorStyleMap.orange },
        green  : { style: colorStyleMap.green },
        blue   : { style: colorStyleMap.blue },
        grey   : { style: colorStyleMap.grey },
      },
    };

    let contentState = editorState.getCurrentContent()
    let html = stateToHTML(contentState, options)
    console.log("HTML:", html)
  }

  toggleColor = (toggledColor) => this._toggleColor(toggledColor)

  // toggleColor = () => {
  //   console.log(this.state.editorState.getCurrentInlineStyle())
  //   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, '269973'))
  // }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }

  _onItalicsClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }

  _toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection()

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());

    console.log("Next Content State:", nextContentState)

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    this.onChange(nextEditorState);
  }

  render() {
    const { editorState } = this.state

    return (
      <Panel bsStyle='primary' header="Draft.js Editor"
             style={{ alignSelf: 'stretch', alignItems: 'stretch', width: '100%' }}>
        <div style={ styles.root }>
          <ColorControls
            editorState={ editorState }
            onToggle={ this.toggleColor }
          />
          <div style={ styles.editor } onClick={ this.focus }>
            <Editor
              customStyleMap={ colorStyleMap }
              editorState={ editorState }
              onChange={ this.onChange }
              placeholder={ 'Write something...' }
              ref={ 'editor' }
            />
          </div>
          <Button onClick={ () => this._onBoldClick() }>Bold</Button>
          <Button onClick={ () => this._onItalicsClick() }>Italics</Button>
          <Button onClick={ () => this.toggleColor() }>Green</Button>
          <Button onClick={ () => this.onExportHTML(editorState) }>Export</Button>
        </div>
      </Panel>
    )
  }
}

module.exports = ReactSimpleRTE
