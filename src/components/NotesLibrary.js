/* Created by alexdemars94 on 8/26/16. */

// React Stuff
import React from 'react'
// import {Modal, Button} from 'react-bootstrap'

// Custom Components
import NoteList from './NoteList'
import NoteIcon from './NoteIcon'

// This is the main React component that will hold all state and methods for react-note
class NotesLibrary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      caseComponents : [],
      loaded         : false,
      showModal      : true,
      showEditor     : false,
      notes          : []
    }
  }

  static propTypes = { caseId: React.PropTypes.number.isRequired }
  static defaultProps = {}

  componentWillMount() {
    this.getCaseNotes()
  }

  onToggleShowModal = () => this.setState({showModal: !this.state.showModal}) // Super slick one-liner
  onToggleShowEditor = () => this.setState({ showEditor: !this.state.showEditor }) // So slick

  onAddNote = () => {
    this.setState({
      note               : null,
      caseComponentClass : this.state.caseComponent.entityName,
      caseComponentId    : this.state.caseComponent.id,
      showNoteEditor     : true
    })
  }

  getCaseNotes = () => {
    let url = `https://jtidev-config.ecourt.com/sustain/ws/rest/ecourt/search/CaseNote/case.id/${ this.props.caseId }?depth=1&includeClobs=true`
    fetch(url,
      {
        method : 'GET',
        headers: {
          'Authorization' : `Basic ${btoa('admin:@pass$')}`,
          'content-type'  : 'application/json'
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Data:", data)
        if (data) {
          // Set state as callback to ensure renderNoteList isn't called without this.state.notes being set
          this.setState({ caseComponents: data })
          this.updateNotesArray()
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  updateNotesArray = () => {
    let notes = []
    this.state.caseComponents.forEach((component) => {
      notes.push(component.content)
      // Set state once the notes array contains content from all case components
      if (notes.length === this.state.caseComponents.length) {
        this.setState({ notes: notes, loaded: true })
      }
    })
  }

  renderNoteList = () => {
    let noteListProps = {
      showModal          : this.state.showModal,
      showEditor         : this.state.showEditor,
      onToggleShowModal  : this.onToggleShowModal,
      onToggleShowEditor : this.onToggleShowEditor,
      caseComponents     : this.state.caseComponents,
      notes              : this.state.notes,
      typeFilters        : []
    }

    console.log("Note list props:", noteListProps)

    return (
      <NoteList { ...noteListProps } />
    )
  }

  render() {
    console.log("Notes array:", this.state.notes)
    return(
      <div>
        <NoteIcon onClick={ this.onToggleShowModal } />
        { this.state.loaded ?  this.renderNoteList() : false }
      </div>
    )
  }
}

module.exports = NotesLibrary
