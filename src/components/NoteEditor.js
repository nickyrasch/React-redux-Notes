/* Created by alexdemars94 on 8/29/16. */

// React Stuff
import React from 'react'
import { Panel, Button, FormControl } from 'react-bootstrap'

// Custom Components
import { NoteColorPicker } from './NoteColorPicker'

class NoteEditor extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    onToggleShowEditor  : React.PropTypes.func.isRequired,
    onChangeNoteContent : React.PropTypes.func.isRequired,
    caseComponent       : React.PropTypes.object
  }

  static defaultProps = {
    header: 'Editor',
    value : ''
  }

  componentDidMount() {
    let container
    tinymce.init({
      selector: 'textarea.tinymce',
      setup: (editor) => {
        editor.on('init', function() {
          let doc = this.getDoc().body
          doc.style.fontSize = '14px'
          doc.style.fontFamily = 'Helvetica Neue, Helvetica'
          container = this.getContainer()
          container.style.borderWidth = '0px'
          container.style.marginBottom = '3px'
          console.log(container)
        })
        editor.on('change', (event) => {
          this.props.onChangeNoteContent(event.target.getContent(), this.props.caseComponent.id)
        })
      },
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

  getPanelColor = (color) => {
    this.props.onChangeNoteColor(color, this.props.caseComponent.id)
  }

  render() {
    return (
      <Panel bsStyle={ this.props.getNoteColor(this.props.caseComponent.color) } header={ this.props.header }>
        <input
          fill
          type="text"
          defaultValue={ this.props.caseComponent.title }
          style={{ width: '100%', height: '32px' }}
          onChange={ (event) => this.props.onChangeNoteTitle(event.target.value, this.props.caseComponent.id) }
        />
        <textarea fill ref={ 'tinymce' } className={ 'tinymce' } defaultValue={ this.props.caseComponent.content }/>

        <NoteColorPicker getNoteColor={ this.getPanelColor }/>

        <Button bsStyle={ 'danger' } className={ 'pull-right' } onClick={ this.props.onToggleShowEditor }>Delete</Button>
        <Button bsStyle={ 'success' } className={ 'pull-right' } style={{ marginRight: '15px' }} onClick={ this.props.onSave }>Save</Button>
        <Button className={ 'pull-right' } style={{ marginRight: '15px' }} onClick={ this.props.onToggleShowEditor }>Cancel</Button>
      </Panel>
    )
  }
}

module.exports = NoteEditor
