/* Created by alexdemars94 on 8/25/16. */

// React Stuff
import React from 'react'
import { Modal } from 'react-bootstrap'

// Custom Components
import NoteSearch from './NoteSearch'
import Note from './Note'
import NoteEditor from './NoteEditor'

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

  componentDidMount() {
    console.log("%cNote List has been mounted.", "color:#58B957;")
  }

  componentWillUnmount() {
    console.log("%cNote List has been unmounted.", "color:#DB524B;")
  }

  createNotes = () => {
    return this.props.caseComponents.map((component, i) => {
      let noteProps = {
        caseComponent: component,
        key          : i
      }
      return <Note { ...noteProps }/>
    })
  }

  onChange = (event) => {
    console.log(event.target.getContent())
  }

  renderNoteEditor = () => {
    return (
      <NoteEditor panelColor={{ style: 'default' }} showEditor={ this.props.showEditor } onToggleShowEditor={ this.props.onToggleShowEditor } onChange={ this.onChange }/>
    )
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
            <NoteSearch
              onToggleShowEditor={ this.props.onToggleShowEditor }
              onToggleShowFilters={ this.props.onToggleShowFilters }
            />

            { this.props.showFilters ? this.props.renderNoteFilter() : null }
            { this.props.showEditor ? this.renderNoteEditor() : null }
            { this.createNotes() }
          </Modal.Body>

          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      )
    } else {
      return <div/>
    }
  }
}
