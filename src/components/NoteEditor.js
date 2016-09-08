/* Created by alexdemars94 on 8/29/16. */

// React Stuff
import React from 'react'
import { Panel, Button, FormControl } from 'react-bootstrap'

// Custom Components
import { NoteColorPicker } from './NoteColorPicker'

class NoteEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      panelStyle: 'primary'
    }
  }
  static propTypes = {
    onToggleShowEditor : React.PropTypes.func.isRequired,
    onChange           : React.PropTypes.func.isRequired
  }

  static defaultProps = {
    header: 'Editor',
    value : ''
  }

  componentDidMount() {
    let container
    tinymce.init({
      setup: (editor) => {
        editor.on('init', function() {
          container = editor.getContainer()
          container.style.borderWidth = '0px'
          container.style.marginBottom = '3px'
          container.childNodes[0].childNodes[0].style.borderRadius = '4px'
          container.childNodes[0].style.height = '128px' // TODO: Add resize event to handle height when window is small
          container.childNodes[0].childNodes[0].style.paddingTop = '0px'
          console.log(container)
        })
        editor.on('change', (event) => {
          this.props.onChange(event)
        })
      },
      selector: 'textarea.tinymce',
      plugins: 'code textcolor link fullscreen table',
      toolbar: 'bold italic underline strikethrough | forecolor backcolor | bullist numlist blockquote | link table code | fullscreen',
      statusbar: false,
      menubar: false
    })
    console.log("%cNoteEditor has been mounted.", "color:#58B957;")
  }

  componentWillUnmount() {
    console.log("%cNoteEditor has been unmounted.", "color:#DB524B;")
  }

  render() {
    return (
      <Panel bsStyle={ this.props.panelColor.style } header={ this.props.header }>
        <input fill type="text" defaultValue={ this.props.titleValue } style={{ width: '100%', height: '32px' }}/>
        <textarea fill ref={ 'tinymce' } className={ 'tinymce' } defaultValue={ this.props.defaultValue }/>
        <NoteColorPicker getNoteColor={ this.props.getNoteColor }/>
        <Button bsStyle={ 'danger' } className={ 'pull-right' } onClick={ this.props.onToggleShowEditor }>Delete</Button>
        <Button bsStyle={ 'success' } className={ 'pull-right' } style={{ marginRight: '15px' }} onClick={ this.props.onSave }>Save</Button>
        <Button className={ 'pull-right' } style={{ marginRight: '15px' }} onClick={ this.props.onCancel }>Cancel</Button>
      </Panel>
    )
  }
}

module.exports = NoteEditor
