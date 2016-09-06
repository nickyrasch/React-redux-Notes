/* Created by alexdemars94 on 8/29/16. */

// React Stuff
import React from 'react'
import { Panel, Button, FormGroup, FormControl } from 'react-bootstrap'

// Components

class NoteEditor extends React.Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    onToggleShowEditor : React.PropTypes.func.isRequired,
    onChangeContent    : React.PropTypes.func.isRequired
  }

  static defaultProps = {
    header: 'Editor',
    value : ''
  }

  componentDidMount() {
    tinymce.init({
      selector: 'textarea.tinymce',
      plugins: 'code textcolor link fullscreen table',
      toolbar: 'bold italic underline strikethrough | forecolor backcolor | bullist numlist blockquote | link table code | fullscreen',
      statusbar: false,
      menubar: false,
      setup: (editor) => {
        editor.on('init', function() {
          let container = editor.getContainer()
          container.style.borderWidth = '0px'
          container.style.marginBottom = '3px'
          container.childNodes[0].childNodes[0].style.borderRadius = '4px'
          container.childNodes[0].childNodes[0].style.paddingTop = '0px'
          console.log(container)
        })
        editor.on('change', (event) => {
          this.props.onChange(event)
        })
      }
    })
    console.log('Editor:', tinymce.activeEditor)
    console.log("REFS", this.refs)
  }

  saveNote = () => {
    console.log("Note being saved with value:", tinymce.activeEditor.getContent())
  }

  render() {
    return (
      <Panel bsStyle={ 'primary' } header={ this.props.header }>
        <textarea fill ref={ 'tinymce' } className={ 'tinymce' } defaultValue={ this.props.defaultValue }/>
        <Button bsStyle={ 'success' } className={ 'pull-right' } onClick={ this.saveNote }>Save</Button>
        <Button className={ 'pull-right' } style={{ marginRight: '15px' }} onClick={ this.props.onToggleShowEditor }>Cancel</Button>
      </Panel>
    )
  }
}

module.exports = NoteEditor
