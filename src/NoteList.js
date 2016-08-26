// React Stuff
import React from 'react'
import {Modal, Button, Panel, Grid, Row, Col, InputGroup, FormControl} from 'react-bootstrap'

// Custom Components
import Node from "./Note"

class NoteList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      offset                  : 0,
      caseNoteOffset          : 0,
      documentAnnotationOffset: 0,
      pageSize                : 5,
      total                   : 0
    }
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

  getNotes = () => {
    var self = this;
    return this.state.results.map(function (note) {
      return <Note note={note} key={'note' + note.id} onEditNote={self.onEditNote.bind(null, note)}
                   updateCallback={self.updateCallback}/>
    });
  }

  onSearch = () => {
    var self = this;
    var state = this.state;

    var caseNoteCount = state.results.filter((note) => {
      return note.type == 'CASE_NOTE'
    }).length;

    var documentAnnotationCount = state.results.filter((note) => {
      return note.type == 'ANNOTATION'
    }).length;

    var caseNoteOffset = state.offset >= state.cnOffset + state.daOffset ? state.cnOffset + caseNoteCount
      : state.cnOffset - state.pageSize < 0 ? Math.max(state.cnOffset - state.pageSize, state.cnOffset)
      : Math.min(state.cnOffset - state.pageSize, state.cnOffset);
    var documentAnnotationOffset = state.offset >= state.cnOffset + state.daOffset ? state.daOffset + documentAnnotationCount
      : state.daOffset - state.pageSize < 0 ? Math.max(state.daOffset - state.pageSize, state.daOffset)
      : Math.min(state.daOffset - state.pageSize, state.daOffset);

    if (state.offset == 0) {
      caseNoteOffset = 0;
      documentAnnotationOffset = 0;
    }

    $j.ajax({
      url : HTMLUtil.Path.ACTION_URL + 'note?dispatch=onSearch',
      data: {
        term              : state.term,
        caseComponentClass: state.caseComponentClass,
        caseComponentId   : state.caseComponentId,
        caseNoteId        : state.caseNoteId,
        cnOffset          : caseNoteOffset,
        daOffset          : documentAnnotationOffset,

        colorFilters        : JSON.stringify(state.colorFilters),
        typeFilters         : JSON.stringify(state.typeFilters),
        rangeFilters        : JSON.stringify(state.rangeFilters),
        tagFilters          : JSON.stringify(state.tagFilters),
        sharingFilters      : JSON.stringify(state.sharingFilters),
        attachedToFilters   : JSON.stringify(state.attachedToFilters),
        searchAllCasesFilter: state.searchAllCasesFilter
      }
    }).complete((data) => {
      var response = JSON.parse(data.responseText);
      self.setState({
        results                     : response.results,
        componentTypes              : response.componentTypes,
        defaultSharedWithAuthorities: response.defaultSharedWithAuthorities,
        cnOffset                    : response.cnOffset,
        daOffset                    : response.daOffset,
        pageSize                    : response.pageSize,
        total                       : response.total
      });

      if (state.results.length == 0 && !self.containsFilters()) {
        self.setState({
          note              : null,
          caseComponentClass: state.caseComponent.id,
          caseComponentId   : state.caseComponent.entityName,
          showNoteEditor    : true
        });
      }

      if (self.containsFilters()) {
        self.onChangeSearchPlaceholder();
      }
    });
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
          <form action="javascript:" className={ 'form-inline' } onSubmit={this.onSearch}
                style={this.props.searchable ? {} : {display: 'none'}}>
            <Grid>
              <Row>
                <Col md={ 8 }>
                  <InputGroup style={{ width: '100%' }}>
                    <FormControl
                      type={ 'text' }
                      value={ this.state.term || '' }
                      placeholder={ this.state.placeholder }
                      onChange={ this.onChangeSearchTerm }
                    />

                    <InputGroup.Button style={{ width: '32px' }}>
                      <Button style={{ width: '100%' }} onClick={ this.onToggleFilters }>
                        <i
                          className={classNames({ 'i-up-caret'   : this.state.showFilters }, { 'i-down-caret' : !this.state.showFilters })}>{/*empty*/}</i>
                      </Button>
                    </InputGroup.Button>
                  </InputGroup>
                </Col>
                <Col md={ 2 }>
                  <Button onClick={ this.onSearch } bsStyle={ 'primary' } style={{ width: '100%' }}>
                    <i className="i-find">{ /*empty*/ }</i>
                  </Button>
                </Col>
                <Col md={ 2 }>
                  <Button onClick={ this.onAddNote } bsStyle={ 'primary' } style={{ width: '100%' }}>
                    + { NotesEditor.MESSAGES.ADD_NOTE }
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
