/* Created by alexdemars94 on 8/25/16. */

import React from 'react';
import { Panel, Button, Grid, Row, Col, ButtonGroup } from 'react-bootstrap'

import NoteEditor from './NoteEditor'

class Note extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditor        : false,
      content           : this.props.caseComponent.content,
      initialPanelColor : this.getNoteColor(this.props.caseComponent.color.toUpperCase()),
      panelColor        : null
    }
  }

  static propTypes = {
    caseComponent: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    console.log("%cNote is about to be mounted to DOM.", "color:#3E8ACC;")
    this.setState({ panelColor: this.getNoteColor(this.props.caseComponent.color.toUpperCase()) })
  }

  componentDidMount() {
    console.log("%cNote has been mounted with caseComponent:", "color:#58B957;", this.props.caseComponent)
  }

  componentWillUnmount() {
    console.log("%cNote has been unmounted.", "color:#DB524B;")
  }

  onToggleShowEditor = () => {
    this.setState({ showEditor: !this.state.showEditor })
  }

  onChange = (event, content) => {
    this.setState({ [content]: event.target.getContent() })
    console.log("Active editor changed:", event.target.getContent())
  }

  onCancel = () => {
    this.onToggleShowEditor()
    this.setState({ panelColor: this.state.initialPanelColor })
    console.log("caseComponent color:", this.props.caseComponent.color)
    console.log("State Color", this.state.panelColor)
  }

  onSaveNote = () => {
    this.onToggleShowEditor()
    let url = `https://jtidev-config.ecourt.com/sustain/ws/rest/ecourt/entities/CaseNote/${this.props.caseComponent.id}`
    fetch(url, {
      method : "PUT",
      headers: {
        "Authorization": `Basic ${btoa('admin:@pass$')}`,
        "Content-Type"  : "application/json"
      },
      body: JSON.stringify({
        content: this.state.content,
        color: this.state.panelColor.code
      })
    })
      .then((res) => res.json()) // Convert response data to  json
      .then((data) => {
        console.log("Data:", data)
      });
  }

  editorGetNoteColor = (color) => this.getNoteColor(color, 'editor')

  getNoteColor = (noteColor, sender) => {
    // Get the hexcode from the caseComponent and use it to set a bsStyle on the Panel component
    let possibleStyles = [
      { code: '#E7E7E7', style: 'default' },
      { code: '#DB524B', style: 'danger' },
      { code: '#F2AE43', style: 'warning' },
      { code: '#58B957', style: 'success' },
      { code: '#3E8ACC', style: 'primary' }
    ]
    let panelColor = null
    possibleStyles.forEach((color) => {
      if (color.code === noteColor) {
        panelColor = color
      }
    })
    if (sender === 'editor') {
      this.setState({ panelColor: panelColor })
    }
    return panelColor
  }

  renderEditor = () => {
    let noteEditorProps = {
      onToggleShowEditor : this.onToggleShowEditor,
      defaultValue       : this.props.caseComponent.content,
      onChange           : (event) => this.onChange(event, 'wubbalubbadubdub'),
      onCancel           : this.onCancel,
      onSave             : this.onSaveNote,
      getNoteColor       : this.editorGetNoteColor,
      panelColor         : this.state.panelColor,
      header             : 'Edit Note',
      titleValue         : this.props.caseComponent.title
    }
    return (
      <div style={{ marginTop: '10px' }}>
        <NoteEditor { ...noteEditorProps }/>
      </div>)
  }

  renderNoteButtons = () => {
    return (
      <ButtonGroup style={{ position: 'absolute', right: '0' }}>
        <Button onClick={ this.onToggleShowEditor }>Edit</Button>
      </ButtonGroup>
    )
  }

  renderNote = () => {
    console.log("State panelColor:", this.state.panelColor)
    return(
      <Panel bsStyle={ this.state.panelColor.style } header={ this.props.caseComponent.title }>
        <Grid fluid>
          <Row style={{ height: '34px' }}>
            <Col sm={ 9 } xs={ 7 }>
              <div dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
            </Col>
            <Col sm={ 3 } xs={ 5 }>
              { this.renderNoteButtons() }
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  }

  render() {
    console.log("THIS DOT STATE:", this.state)
    return (
      <div>
        { this.state.showEditor ? this.renderEditor() : null }
        { !this.state.showEditor ? this.renderNote() : null }
      </div>
    )
  }
}

module.exports = Note
