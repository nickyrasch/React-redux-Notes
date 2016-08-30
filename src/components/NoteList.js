/* Created by alexdemars94 on 8/25/16. */

// React Stuff
import React from 'react'
import { Modal } from 'react-bootstrap'

// Custom Components
import NoteSearch from './NoteSearch'
import Note from './Note'

class NoteList extends React.Component {
  static propTypes = {
    caseComponents     : React.PropTypes.array.isRequired,
    showModal          : React.PropTypes.bool.isRequired,
    showEditor         : React.PropTypes.bool.isRequired,
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
    let arr = this.props.notes.map(() => {
      let noteProps = {
        noteContent: this.props.notes[index],
        key        : index
      }
      index++
      return <Note { ...noteProps }/>
    })
    return arr
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
          <NoteSearch />

          {/*<NoteEditor showEditor={ this.props.showEditor } onToggleShowEditor={ this.props.onToggleShowEditor }/>*/}

          { this.createNotes() /* Render the notes array */ }

        </Modal.Body>

        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }
}

module.exports = NoteList
