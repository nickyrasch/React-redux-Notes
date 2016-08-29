/* Created by alexdemars94 on 8/26/16. */

// React Stuff
import React from 'react'
// import {Modal, Button} from 'react-bootstrap'

// Custom Components
import NoteList from './NoteList'
import NoteIcon from './NoteIcon'
import Note     from './Note'

// This is the main React component that will hold all state and methods for react-note
class NotesLibrary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      caseComponents : [],
      loaded         : false,
      showModal      : true,
      notes          : []
    }
  }

  static propTypes = {
    caseId: React.PropTypes.number.isRequired
  }

  static defaultProps = {}

  componentWillMount() {
    this.getCaseNotes()
  }

  onToggleShowModal = () => this.setState({showModal: !this.state.showModal}) // Super slick one-liner

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
          // Set state as callback to ensure renderNoteList isn't called without this.state.notes being set
          this.formatCaseComponents(data, this.setState({ caseComponents: data, loaded: true }))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  formatCaseComponents = (data, callback) => {
    let newArr = []
    data.forEach((component) => {
      console.log("Component in loop:", component)
      console.log("Content for component:", component.content)

      // Regex to remove HTML tags from content
      let formattedContent = component.content.replace(/<\/?[^>]+(>|$)/g, "");

      let note = <Note key={ formattedContent } noteContent={ formattedContent } />
      newArr.push(note)
      if (newArr.length === this.state.caseComponents.length) {
        // Run set state as callback to ensure this.state.notes is set before being passed to NoteList
        this.setState({notes: newArr}, callback)
      }
    })
  }

  renderNoteList = () => {
    let noteListProps = {
      showModal         : this.state.showModal,
      onToggleShowModal : this.onToggleShowModal,
      caseComponents    : this.state.caseComponents,
      notes             : this.state.notes,
      typeFilters       : []
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
