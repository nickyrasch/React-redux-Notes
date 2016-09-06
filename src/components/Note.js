/* Created by alexdemars94 on 8/25/16. */

import React from 'react';
import { Panel, Button, Grid, Row, Col, ButtonGroup } from 'react-bootstrap'

import NoteEditor from './NoteEditor'

class Note extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditor : false,
      mode       : ''
    }
  }

  static propTypes = {
    caseComponent: React.PropTypes.object.isRequired
  }

  onToggleShowEditor = (mode) => {
    console.log('Mode:', mode)
    this.setState({ showEditor: !this.state.showEditor, mode: !this.state.mode ? mode : '' })
  }

  onChangeContent = (e) => {
    console.log("Event:", e)
  }

  onChange = (event) => {
    console.log(event)
    console.log("Active editor changed:", tinymce.activeEditor.getContent())
  }

  getNoteColor = () => {
    let possibleStyles = [
      { code: '#E7E7E7', style: 'default' },
      { code: '#DB524B', style: 'danger'},
      { code: '#F2AE43', style: 'warn' },
      { code: '#58B957', style: 'success' },
      { code: '#3E8ACC', style: 'primary' }
    ]
    let panelStyle = null
    possibleStyles.forEach((color) => {
      if (color.code === this.props.caseComponent.color.toUpperCase()) {
        panelStyle = color.style
      }
    })
    return panelStyle
  }

  renderEditor = () => {
    let editorProps = {
      mode               : this.state.mode,
      onToggleShowEditor : this.onToggleShowEditor
    }
    return (
      <div style={{ marginTop: '10px' }}>
        <NoteEditor onToggleShowEditor={ this.onToggleShowEditor } defaultValue={ this.props.caseComponent.content } onChange={ this.onChange } onChangeContent={ this.onChangeContent } header={ 'Edit Note' }/>
      </div>)
  }

  renderNoteButtons = () => {
    return (
      <ButtonGroup style={{ position: 'absolute', right: '0' }}>
        <Button onClick={ this.onToggleShowEditor }>Edit</Button>
      </ButtonGroup>
    )
  }

  render() {
    return (
      <div>
        <Panel bsStyle={ this.getNoteColor() }>
          <Grid fluid>
            <Row style={{ height: '34px' }}>
              <Col sm={ 9 } xs={ 7 }>
                <div dangerouslySetInnerHTML={{ __html: this.props.caseComponent.content }}></div>
              </Col>
              <Col sm={ 3 } xs={ 5 }>
                { this.renderNoteButtons() }
              </Col>
            </Row>
          </Grid>
          { this.state.showEditor ? this.renderEditor() : false }
        </Panel>

      </div>
    )
  }
}

module.exports = Note
