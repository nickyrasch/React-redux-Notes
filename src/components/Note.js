/* Created by alexdemars94 on 8/25/16. */

import React from 'react';
import { Panel, Button, Grid, Row, Col, ButtonGroup } from 'react-bootstrap'

import ReactSimpleRTE from './ReactSimpleRTE'

class Note extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditor : false,
      mode       : ''
    }
  }

  static propTypes = {
    noteContent: React.PropTypes.string.isRequired
  }

  onToggleShowEditor = (mode) => {
    console.log('Mode:', mode)
    this.setState({ showEditor: !this.state.showEditor, mode: !this.state.mode ? mode : '' })
  }

  renderEditor = () => {
    let editorProps = {
      mode               : this.state.mode,
      noteContent        : this.props.noteContent,
      onToggleShowEditor : this.onToggleShowEditor
    }
    return (
      <div style={{ marginTop: '10px' }}>
        <ReactSimpleRTE { ...editorProps }/>
      </div>)
  }

  renderNoteButtons = () => {
    return (
      <ButtonGroup style={{ position: 'absolute', right: '0' }}>
        <Button onClick={ () => this.onToggleShowEditor('edit') }>Edit</Button>
        <Button onClick={ () => this.onToggleShowEditor('reply') }>Reply</Button>
      </ButtonGroup>
    )
  }

  render() {
    return (
      <div>
        <Panel bsStyle="default">
          <Grid fluid>
            <Row style={{ height: '34px' }}>
              <Col sm={ 9 } xs={ 7 }>
                <div dangerouslySetInnerHTML={{ __html: this.props.noteContent }}></div>
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
