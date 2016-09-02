/* Created by alexdemars94 on 8/30/16. */

// React Stuff
import React from 'react'
import { Panel, Button, DropdownButton, MenuItem, ButtonGroup } from 'react-bootstrap'

// Draft JS Stuff
import { Editor, EditorState, RichUtils, Modifier, convertFromHTML, convertToRaw, convertFromRaw, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import {stateFromElement } from 'draft-js-import-element'

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
  SPAN: {
    color: 'rgb(217,83,79)'
  },
  red: {
    color: '#d9534f'
  },
  orange: {
    color: '#f0ad4e'
  },
  green: {
    color: '#5cb85c'
  },
  blue: {
    color: '#428bca'
  },
  grey: {
    color: '#e7e7e7'
  }
}

let html

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// ******************* Controls ********************
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

class Controls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  static propTypes = {
    editorState: React.PropTypes.object.isRequired
  }

  renderMenuItems = () => {
    let currentStyle = this.props.editorState.getCurrentInlineStyle()
    return colors.map((color, i) => {
      return (
        <StyleButton
          index={ i.toString() }
          active={ currentStyle.has(color.style) }
          label={ color.label }
          toggleColor={ this.props.toggleColor }
          key={ i.toString() }
          style={ color.style }
        />
      )
    })
  }

  render() {
    return (
      <ButtonGroup>
        <Button onClick={ this.props.onBoldClick }>Bold</Button>
        <Button onClick={ () => this.props.onItalicsClick(this.props.editorState) }>Italics</Button>
        <Button onClick={ () => this.props.onImportHTML(this.props.editorState) }>Import</Button>
        <Button onClick={ () => this.props.onExportHTML(this.props.editorState) }>Export</Button>
        <DropdownButton title={ 'Color' } id={ 'dropdown-basic' } dropup>
          { this.renderMenuItems() }
        </DropdownButton>
      </ButtonGroup>
    )
  }
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// ***************** Style Buttons *****************
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

class StyleButton extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = () => {
      this.props.toggleColor(this.props.style);
    };
  }

  render() {
    let style
    if (this.props.active) {
      style = { ...styles.styleButton, ...colorStyleMap[this.props.style] }
      console.log("Style:", style)
    } else {
      style = styles.styleButton
    }
    return (
      <MenuItem eventKey={ this.props.index } onSelect={ this.onToggle }>
        <span style={style}>
          { this.props.label }
        </span>
      </MenuItem>
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

  onChange = (editorState) => {
    console.log("Editor State:", editorState)
    console.log("Editor State Context:", editorState.getCurrentContent()._map._root.entries[0][1]._list._tail.array[0][1]._map._root.entries)
    this.setState({ editorState })
  }

  parseHTML = (html) => {
    var doc = void 0;
    if (typeof DOMParser !== 'undefined') {
      var parser = new DOMParser();
      doc = parser.parseFromString(html, 'text/html');
    } else {
      doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
    }
    return doc.body;
  }

  onImportHTML = (editorState) => {

    // let htmlStr = this.props.noteContent
    let htmlStr = '<p>No color should be here. <span style=\"color: RGB(38, 153, 115)\">This should have color. </span><span style=\"color: RGB(33, 66, 128)\">This should also have color. </span><span style=\"color: RGB(115, 155, 229)\">This one too.</span></p>'
    // let htmlStr = "<p>- Why should the court excuse an outburst on the date in question?</p>\n<p>- Timeliness records.</p>"
    // let htmlStr = "<p><span style=\"color: rgb(51, 51, 51); font-family: 'Lucida Grande', 'Lucida Sans Unicode', Arial, Verdana, sans-serif; font-size: 11.0500001907349px; line-height: 16.5750007629395px;\">Vestibulum at scelerisque tortor, euismod hendrerit dui. Phasellus ullamcorper nec nulla a placerat. Sed elementum pulvinar tempus.&nbsp;#important&nbsp;is the tag</span></p>"
    let parsedHTML = this.parseHTML(htmlStr)

    let parsedHTMLChildCount = parsedHTML.childNodes.length
    let colors = []
    let states = []

    for (let i = 0; i < parsedHTMLChildCount; i++) {
      let childNode = parsedHTML.childNodes[i]
      console.log("childNode in loop:", childNode)
      let childNodeChildCount = childNode.childNodes.length
      if (childNodeChildCount > 1) {
        for (let j = 0; j < childNodeChildCount; j++) {
          let childNodeChild = childNode.childNodes[j]
          let childNodeChildContentState = stateFromHTML(childNodeChild)

          RichUtils.toggleInlineStyle(
            childNodeChildContentState,
            colorStyleMap.orange
          )

          states.push(childNodeChildContentState)
          let childNodeChildStyle = childNodeChild.style.color
          console.log("childNode child style", childNodeChildStyle)
          colors.push(childNodeChildStyle)
          colorStyleMap.SPAN.color = childNodeChildStyle
        }
      } else if ( childNodeChildCount < 2 ) {
        console.log('childNode style:', childNode.style.color)
        colors.push(childNode.style.color)
        colorStyleMap.SPAN.color = childNode.style.color
        break
      }
      console.log("Color Array:", colors)
      console.log("States Array:", states)
    }

    let convertedHTML = stateFromElement(parsedHTML, {
      elementStyles: {
        'span' : 'SPAN',
        'style': 'STYLE'
      }
    })
    console.log("Converted HTML:", convertedHTML._map._root.entries[0][1]._list._tail.array[0][1]._map._root.entries)

    // let contentState = ContentState.createFromBlockArray(convertedHTML)



    let nextEditorState = EditorState.createWithContent(convertedHTML)
    // console.log("Editor State:", nextEditorState)
    this.onChange(nextEditorState)
  }

  onExportHTML = (editorState) => {
    // Get the style from the wrapper block and add it inline before exporting HTML
    let options = {
      inlineStyles: {
        // Override default <strong> tags.
        BOLD   : { element: 'b' },
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

  _onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }

  _onItalicsClick = () => {
    console.log("THIS", this)
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
    return (
      <Panel bsStyle='primary'
             header={ this.state.title }
             style={{ alignSelf: 'stretch', alignItems: 'stretch', width: '100%' }}>
        <div style={ styles.root }>
          <Controls
            editorState={ this.state.editorState }
            toggleColor={ this.toggleColor }
            onBoldClick={ this._onBoldClick }
            onItalicsClick={ this._onItalicsClick }
            onImportHTML={ this.onImportHTML }
            onExportHTML={ this.onExportHTML }
          />
          <div style={ styles.editor } onClick={ this.focus }>
            <Editor
              customStyleMap={ colorStyleMap }
              editorState={ this.state.editorState }
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
