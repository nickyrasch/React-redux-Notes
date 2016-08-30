/* Created by alexdemars94 on 8/30/16. */

// React Stuff
import React from 'react'
import { Panel, Button } from 'react-bootstrap'

// Draft JS Stuff
import { Editor, EditorState, RichUtils, Modifier, convertFromHTML, convertToRaw, convertFromRaw, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'

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
    minHeight: 128,
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

let html

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// **************** Color Controls *****************
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

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

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// ***************** Style Buttons *****************
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

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

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// *************** React Simple RTE ****************
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

class ReactSimpleRTE extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState : EditorState.createEmpty(),
      title       : ''
    }
  }

  static propTypes = {
    noteContent        : React.PropTypes.string.isRequired,
    mode               : React.PropTypes.string.isRequired,
    onToggleShowEditor : React.PropTypes.func.isRequired
  }

  componentWillMount() {
    if ( this.props.mode === 'edit' ) {
      this.onImportHTML()
      this.setState({ title: "Edit Note" })
    }
  }

  focus = () => this.refs.editor.focus()

  onChange = (editorState) => this.setState({ editorState })

  onImportHTML = (editorState) => {
    // let nextEditorState = EditorState.createWithContent(stateFromHTML())
    let htmlStr = this.props.noteContent
    // let htmlStr = '<span style=\"color: #5cb85c\">This is some content.</span>'
    // let convertedHTML = convertFromHTML(htmlStr)
    console.log(htmlStr)
    let convertedHTML = stateFromHTML(htmlStr)
    console.log("Converted HTML:", convertedHTML)

    // let contentState = ContentState.createFromBlockArray(convertedHTML)
    let nextEditorState = EditorState.createWithContent(convertedHTML)
    this.onChange(nextEditorState)
  }

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
    html = stateToHTML(contentState, options)
    console.log("HTML:", html)
  }

  toggleColor = (toggledColor) => this._toggleColor(toggledColor)

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }

  _onItalicsClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }

  _toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection()

    // Allow one color at a time. Turn off all active colors.
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
      <Panel bsStyle='primary'
             header={ this.state.title }
             style={{ alignSelf: 'stretch', alignItems: 'stretch', width: '100%' }}>
        <div style={ styles.root }>
          <ColorControls
            editorState={ editorState }
            onToggle={ this.toggleColor }
          />
          
          <Button onClick={ () => this._onBoldClick() } style={{ marginTop: '4px', marginRight: '4px' }}>Bold</Button>
          <Button onClick={ () => this._onItalicsClick() } style={{ marginTop: '4px', marginRight: '4px' }}>Italics</Button>
          <Button onClick={ () => this.onImportHTML(editorState) } style={{ marginTop: '4px', marginRight: '4px' }}>Import</Button>
          <Button onClick={ () => this.onExportHTML(editorState) } style={{ marginTop: '4px', marginRight: '4px' }}>Export</Button>

          <div style={ styles.editor } onClick={ this.focus }>
            <Editor
              customStyleMap={ colorStyleMap }
              editorState={ editorState }
              onChange={ this.onChange }
              placeholder={ 'Write something...' }
              ref={ 'editor' }
            />
          </div>
          <Button onClick={ () => this.props.onToggleShowEditor('') } style={{ marginTop: '4px', marginRight: '4px' }}>Close</Button>
        </div>
      </Panel>
    )
  }
}

module.exports = ReactSimpleRTE
