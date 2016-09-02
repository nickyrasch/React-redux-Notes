/* Created by alexdemars94 on 8/26/16. */

// React Stuff
import React, { Component } from 'react'
import { refetch } from '../utils/api-connector'

// Custom Components
import NoteList from './NoteList'
import NoteIcon from './NoteIcon'

// This is the main React component that will hold all state and methods for react-note
class NotesLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal      : true,
      showEditor     : false,
      caseComponents : []
    }
  }

  static propTypes = {
    caseId: React.PropTypes.number.isRequired
  }

  static defaultProps = {
    caseComponents : [],
    notes          : []
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ caseComponents: nextProps.caseComponents.value }, () => this.updateNotesArray())
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
      notes              : this.state.notes
    }

    return (
      <NoteList { ...noteListProps } />
    )
  }

  render() {
    return(
      <div>
        <NoteIcon onClick={ this.onToggleShowModal } />
        { this.state.loaded ? this.renderNoteList() : false }
      </div>
    )
  }
}

export default refetch(props => ({
  caseComponents: {
    url: `https://jtidev-config.ecourt.com/sustain/ws/rest/ecourt/search/CaseNote/case.id/${ props.caseId }?depth=1&includeClobs=true`
  }
}))(NotesLibrary)
