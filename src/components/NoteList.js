/* Created by alexdemars94 on 8/25/16. */

// React Stuff
import React from 'react'
import { Modal } from 'react-bootstrap'

// Custom Components
import NoteSearch from './NoteSearch'
import Note from './Note'
import NoteEditor from './NoteEditor'
import NoteFilter from './NoteFilter'

export default class NoteList extends React.Component {
  static propTypes = {
    caseComponents     : React.PropTypes.array.isRequired,
    showModal          : React.PropTypes.bool.isRequired,
    showEditor         : React.PropTypes.bool.isRequired,
    showFilters        : React.PropTypes.bool.isRequired,
    onToggleShowModal  : React.PropTypes.func.isRequired,
    onToggleShowEditor : React.PropTypes.func.isRequired
  }

  static defaultProps = {
    newNoteOnOpen  : false,
    editNoteOnOpen : false,
    searchable     : true,
    typeFilters    : ['CASE_NOTE', 'ANNOTATION'],
    sharingFilters : []
  }

  createNotes = () => {
    let index = 0
    return this.props.notes.map(() => {
      let noteProps = {
        noteContent: this.props.notes[index],
        key        : index
      }
      index++
      return <Note { ...noteProps }/>
    })
  }

  renderFilters = () => {
    return (
      <NoteFilter />
    )
  }

  renderNoteEditor = () => {
    return (
      <NoteEditor showEditor={ this.props.showEditor } onChangeContent={ this.onChangeContent } onToggleShowEditor={ this.props.onToggleShowEditor }/>
    )
  }

  render() {
    console.log("Rendering NoteList.js")
    let caseName = this.props.caseComponents[0].case.caseName

    let modalProps = {
      show  : this.props.showModal,
      onHide: this.props.onToggleShowModal,
      bsSize: 'large'
    }

    return (
      <Modal show={ this.props.showModal } { ...modalProps }>
        <Modal.Header closeButton>
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>Notes for: </span><span
          style={{ fontSize: "18px" }}>{ caseName }</span>
        </Modal.Header>

        <Modal.Body>
          <NoteSearch onToggleShowEditor={ this.props.onToggleShowEditor } onToggleShowFilters={ this.props.onToggleShowFilters }/> {/* Render the search bar and search buttons */}
          { this.props.showFilters ? this.renderFilters() : null }
          { this.props.showEditor ? this.renderNoteEditor() : null }
          { this.createNotes() /* Render the notes array */ }
        </Modal.Body>

        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }
}
