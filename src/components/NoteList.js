/* Created by alexdemars94 on 8/25/16. */

// React Stuff
import React from 'react'
import {Modal, Button, Panel, Grid, Row, Col, InputGroup, FormControl} from 'react-bootstrap'

// Custom Components
// import Note from "./Note"

class NoteList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    caseComponent    : React.PropTypes.object.isRequired,
    onToggleShowModal: React.PropTypes.func.isRequired,
    showModal        : React.PropTypes.bool.isRequired
  }

  static defaultProps = {
    newNoteOnOpen : false,
    editNoteOnOpen: false,
    searchable    : true,
    typeFilters   : ['CASE_NOTE', 'ANNOTATION'],
    sharingFilters: []
  }

  componentDidMount() {
    console.log("NoteList mounted with props:", this.props)
  }

  render() {
    let modalProps = {
      show  : this.props.showModal,
      onHide: this.props.onToggleShowModal,
      bsSize: 'large'
    }

    return (
      <Modal show={ this.props.showModal } { ...modalProps }>
        <Modal.Header closeButton>
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>Notes for: </span><span
          style={{ fontSize: "18px" }}>{ this.props.caseComponent.title }</span>
        </Modal.Header>
        <Modal.Body>
          <form action="javascript:" className={ 'form-inline' }
                onSubmit={this.onSearch}
                style={ this.props.searchable ? { marginBottom: '15px' } : { display: 'none' }}>
            <Grid fluid>
              <Row>
                <Col sm={ 8 }>
                  <InputGroup style={{ width: '100%' }}>
                    <FormControl
                      type={ 'text' }
                      value={ this.state.term || '' }
                      placeholder={ this.state.placeholder }
                      onChange={ this.onChangeSearchTerm }
                    />

                    <InputGroup.Button style={{ width: '32px' }}>
                      <Button style={{ width: '100%' }} onClick={ this.onToggleFilters }>
                        Filters
                      </Button>
                    </InputGroup.Button>
                  </InputGroup>
                </Col>
                <Col sm={ 2 }>
                  <Button onClick={ this.onSearch } bsStyle={ 'primary' } style={{ width: '100%' }}>
                    Search
                  </Button>
                </Col>
                <Col sm={ 2 }>
                  <Button onClick={ this.onAddNote } bsStyle={ 'success' } style={{ width: '100%' }}>
                    Add Note
                  </Button>
                </Col>
              </Row>
            </Grid>
          </form>

          <Panel bsStyle="primary">
            This will contain a note.
          </Panel>
          <Panel bsStyle="success">
            This will contain a note.
          </Panel>
          <Panel bsStyle="danger">
            This will contain a note.
          </Panel>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }
}

module.exports = NoteList
