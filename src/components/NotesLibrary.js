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
      caseComponent : null,
      loaded        : false,
      showModal     : true
    }
  }

  static propTypes = {
    caseId: React.PropTypes.number.isRequired
  }

  static defaultProps = {}

  componentWillMount() {
    this.getCaseNotes()
  }

  getCaseNotes = () => {
    let url = `https://jtidev-qa.ecourt.com/sustain/ws/rest/ecourt/search/CaseNote/case.id/${ this.props.caseId }?depth=1&includeClobs=true`
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
          this.setState({caseComponent: data, loaded: true})
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  onToggleShowModal = () => this.setState({showModal: !this.state.showModal})

  renderNoteList = () => {
    let noteListProps = {
      showModal        : this.state.showModal,
      onToggleShowModal: this.onToggleShowModal,
      caseComponent    : this.state.caseComponent,
      typeFilters      : []
    }
    return (
      <NoteList { ...noteListProps } />
    )
  }

  render() {
    return(
      <div>
        <NoteIcon onClick={ this.onToggleShowModal }/>
        { this.state.loaded ?  this.renderNoteList() : false }
      </div>
    )
  }
}

module.exports = NotesLibrary
