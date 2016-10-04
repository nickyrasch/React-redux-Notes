import React from 'react'
import { Modal, ListGroup, ListGroupItem } from 'react-bootstrap'
// Custom Components
import NoteSearch from './NoteSearch'
import Note from './Note'
import NoteEditor from './NoteEditor'

export default class NoteList extends React.Component {
  static propTypes = {
    showModal          : React.PropTypes.bool.isRequired,
    showEditor         : React.PropTypes.bool.isRequired,
    showFilter         : React.PropTypes.bool.isRequired,
    onToggleShowModal  : React.PropTypes.func.isRequired,
    onToggleShowEditor : React.PropTypes.func.isRequired,
    onToggleShowFilter : React.PropTypes.func.isRequired,
    onChangeSearchTerm : React.PropTypes.func.isRequired,
    getCaseComponents  : React.PropTypes.func.isRequired,
    caseComponents     : React.PropTypes.array.isRequired
  }

  static defaultProps = {
    newNoteOnOpen  : false,
    editNoteOnOpen : false,
    searchable     : true,
    typeFilters    : ['CASE_NOTE', 'ANNOTATION'],
    sharingFilters : []
  }

  componentDidMount() {
    console.log("%cNote List has been mounted.", "color:#58B957;")
  }

  componentWillUnmount() {
    console.log("%cNote List has been unmounted.", "color:#DB524B;")
    {this.props.showFilter ? this.props.onToggleShowFilter() : null}
  }

  renderNoteSearch = () => {
    let noteSearchProps = {
      showFilter         : this.props.showFilter,
      onSearch           : this.props.onSearch,
      searchTerm         : this.props.searchTerm,
      onToggleShowEditor : this.props.onToggleShowEditor,
      onToggleShowFilter : this.props.onToggleShowFilter,
      onChangeSearchTerm : this.props.onChangeSearchTerm
    }
    return(
      <NoteSearch { ...noteSearchProps }/>
    )
  }

  renderNotes = () => {
    let components = this.props.caseComponents
    let filteredNotes = components.filter(
        (component) => {
          return component.content.indexOf(this.props.searchTerm) !== -1;
        }
    )
    return filteredNotes.map((component, i) => {
      let noteProps = {
        key                 : i,
        index               : i,
        caseComponent       : component,
        getCaseComponents   : this.props.getCaseComponents,
        onChangeNoteColor   : this.props.onChangeNoteColor,
        onChangeNoteTitle   : this.props.onChangeNoteTitle,
        onChangeNoteContent : this.props.onChangeNoteContent,
        onToggleShowEditor  : this.props.onToggleShowEditor,
        onSaveNote          : this.props.onSaveNote,
        showEditor         : this.props.showEditor,
        onToggleShowEditor : this.props.onToggleShowEditor,
      }
      return <Note { ...noteProps }/>
    })
  }

  render() {
    if (this.props.caseComponents.length > 0) {
      let caseName = this.props.caseComponents[0].case.caseName
      let modalProps = {
        show  : this.props.showModal,
        onHide: this.props.onToggleShowModal,
        bsSize: 'large'
      }
      return (
        <Modal show={ this.props.showModal } { ...modalProps }>

          <Modal.Header closeButton>
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>Notes for: </span>
            <span style={{ fontSize: "18px" }}>{ caseName }</span>
          </Modal.Header>

          <Modal.Body>
              { this.renderNoteSearch() }
              { this.renderNotes() }
          </Modal.Body>

        </Modal>
      )
    } else {
      return <div/>
    }
  }
}
