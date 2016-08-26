// React Stuff
import React from 'react'
import { Modal, Button } from 'react-bootstrap'

// NPM Package Stuff
import base64 from 'base-64'

// Custom Components
import NoteList from './NoteList'

// This is the main React component that will hold all state and methods for react-note
class NoteIcon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  static propTypes = {
    dialogId      : React.PropTypes.string.isRequired,
    caseComponent : React.PropTypes.object.isRequired
  }

  static defaultProps = {
    showIconWhenEmpty : true,
    newNoteOnOpen     : false,
    initialNoteClass  : true,
    noteClass         : 'icon case-note-add',
    containerClass    : '',
    containerStyle    : { padding: '8px' }
  }

  componentWillMount() {
    this.getCaseNotes()
  }

  getCaseNotes = () => {
    let url = 'http://localhost:8080/sustain/ws/rest/ecourt/search/CaseNote/case.id/'
      + this.props.caseComponent.id + '?includeClobs=true'

    fetch(url,
      {
        method  : 'GET',
        headers : {
          'Authorization' : 'Basic ' + base64.encode('joe' + ':' + 'pass'),
          'contentType'   : 'application/json'
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Data:", data);
      })
  }

  onToggleShowModal = () => this.setState({ showModal: !this.state.showModal })

  renderNoteList = () => {
    console.log("Rendering NoteList for " + "%c" + this.props.caseComponent.title + "%c with showModal value "
      + "%c" +  this.state.showModal, "color:#214280", "color:#000", "color:#269973")

    let noteListProps = {
      showModal         : this.state.showModal,
      onToggleShowModal : this.onToggleShowModal,
      newNoteOnOpen     : this.props.newNoteOnOpen,
      caseComponent     : this.props.caseComponent,
      typeFilters       : []
    }
    return (
      <NoteList { ...noteListProps } />
      // This is the same as this:
      // <NoteList showModal={ this.state.showModal } onToggleShowModal={ this.onToggleShowModal } />
    )
  }

  render() {
    return (
      <div>
		    <a href="javascript:" className={ this.props.containerClass } onClick={ this.onToggleShowModal }>
          <i className={ this.props.noteClass }/>
        </a>
        {
          // Only render the modal if showModal is true, otherwise page scrolling breaks
          this.state.showModal ? this.renderNoteList() : false
        }
      </div>
    )
  }
}

module.exports = NoteIcon
