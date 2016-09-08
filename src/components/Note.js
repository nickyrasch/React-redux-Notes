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
      title             : this.props.caseComponent.title,
      initialPanelColor : this.getNoteColor(this.props.caseComponent.color.toUpperCase()),
      panelColor        : this.props.caseComponent.color,
      loading           : false
    }
  }

  static propTypes = {
    caseComponent     : React.PropTypes.object.isRequired,
    getCaseComponents : React.PropTypes.func.isRequired
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

  toggleLoading = () => this.setState({ loading: !this.state.loading })

  onToggleShowEditor = () => this.setState({ showEditor: !this.state.showEditor })
  onChangeNoteBody   = (event) => this.setState({ content: event.target.getContent() })
  onChangeNoteTitle  = (event) => this.setState({ title: event.target.value })

  onCancel = () => {
    this.onToggleShowEditor()
    this.setState({ panelColor: this.state.initialPanelColor })
  }

  onSaveNote = () => {
    this.toggleLoading()
    this.onToggleShowEditor()
    let url = `https://jtidev-config.ecourt.com/sustain/ws/rest/ecourt/entities/CaseNote/${this.props.caseComponent.id}`
    fetch(url, {
      method : "PUT",
      headers: {
        "Authorization": `Basic ${btoa('admin:@pass$')}`,
        "Content-Type"  : "application/json"
      },
      body: JSON.stringify({
        content : this.state.content,
        color   : this.state.panelColor.code,
        title   : this.state.title
      })
    })
      .then((res) => res.json()) // Convert response data to  json
      .then(() => {
        this.props.getCaseComponents(this.props.caseComponent.id, this.props.index, this.toggleLoading)
      })
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

  renderActivityIndicator = () => {
    return (
      <span style={{ fontSize: '14px' }}>
        <span>{ this.state.title }</span>
        <span className={ 'pull-right' }>Loading...</span>
      </span>
    )
  }

  renderEditor = () => {
    let noteEditorProps = {
      onToggleShowEditor : this.onToggleShowEditor,
      defaultValue       : this.props.caseComponent.content,
      onChange           : this.onChangeNoteBody,
      onChangeNoteTitle  : this.onChangeNoteTitle,
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
      <Panel bsStyle={ this.state.panelColor.style } header={ this.state.loading ? this.renderActivityIndicator() : this.state.title }>

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
    return (
      <div>
        { this.state.showEditor ? this.renderEditor() : null }
        { !this.state.showEditor ? this.renderNote() : null }
      </div>
    )
  }
}

module.exports = Note
