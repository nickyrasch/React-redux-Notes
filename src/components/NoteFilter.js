import React from 'react'
import { Panel, Checkbox, Grid, Row, Col } from 'react-bootstrap'
import NoteColorPicker from './NoteColorPicker'

const NoteFilter = () => {

    return (
      <Panel bsStyle={ 'info' } style={{ color:'#2E7090', backgroundColor: '#D8EDF8' }}>
        <div>
          <strong>Color</strong>
          <NoteColorPicker />
        </div>
        <br/>
        <div>
          <strong>Type</strong>
          <Grid fluid>
            <Row>
              <Col md={ 3 }>
                <Checkbox>Show Case Notes</Checkbox>
              </Col>
              <Col md={ 9 }>
                <Checkbox>Show Document Annotations</Checkbox>
              </Col>
            </Row>
          </Grid>
        </div>
        <div>
          <strong>Date Created</strong>
          <Grid fluid>
            <Row>
              <Col md={ 3 }>
                <Checkbox>Today</Checkbox>
              </Col>
              <Col md={ 3 }>
                <Checkbox>This week</Checkbox>
              </Col>
              <Col md={ 3 }>
                <Checkbox>This month</Checkbox>
              </Col>
              <Col md={ 3 }>
                <Checkbox>Last three months</Checkbox>
              </Col>
            </Row>
          </Grid>
        </div>
        <div>
          <strong>Sharing</strong>
          <Grid fluid>
            <Row>
              <Col md={ 3 }>
                <Checkbox>Shared with everybody</Checkbox>
              </Col>
              <Col md={ 3 }>
                <Checkbox>Shared with me</Checkbox>
              </Col>
              <Col md={ 6 }>
                <Checkbox>Shared with my user group</Checkbox>
              </Col>
            </Row>
          </Grid>
        </div>
        <div>
          <strong>Case</strong>
          <Grid fluid>
            <Row>
              <Col md={ 12 }>
                <Checkbox>Search all cases</Checkbox>
              </Col>
            </Row>
          </Grid>
        </div>
      </Panel>
    )
}

export default NoteFilter