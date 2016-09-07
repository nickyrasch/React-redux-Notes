/* Created by alexdemars94 on 8/26/16. */

// React Stuff
import React, { Component } from 'react'

// Custom Components
import NoteList from './NoteList'
import NoteIcon from './NoteIcon'
import NoteFilter from './NoteFilter'

// This is the main React component that will hold all state and methods for react-note
export default class NotesLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal      : true,
      showEditor     : false,
      showFilters    : false,
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

  componentDidMount() {
    console.log("%cNotes Library has been mounted.", "color:#58B957;")
    this.getCaseComponents()
  }

  componentWillUnmount() {
    console.log("%cNotes Library has been unmounted.", "color:#DB524B;")
  }

  onToggleShowModal   = () => this.setState({ showModal: !this.state.showModal }) // Super slick one-liner
  onToggleShowEditor  = () => this.setState({ showEditor: !this.state.showEditor }) // So slick
  onToggleShowFilters = () => this.setState({ showFilters: !this.state.showFilters }) // Awwww yeah

  getCaseComponents = () => {
    let url = `https://jtidev-config.ecourt.com/sustain/ws/rest/ecourt/search/CaseNote/case.id/${ this.props.caseId }?depth=1&includeClobs=true`
    fetch(url, {
      method : "GET",
      headers: { "Authorization": `Basic ${btoa('admin:@pass$')}` },
    })
      .then((res) => res.json())
      .then((caseComponentData) => {
        this.updateCaseComponentArray(caseComponentData, (caseComponentData) => {
          this.setState({ caseComponents: caseComponentData })
        })
      })
  }

  updateCaseComponentArray = (array, callback) => {
    array.forEach((item, i) => {
      item.showEditor = false
      if (i === array.length - 1) {
        callback(array)
      }
    })
  }

  renderNoteFilter = () => {
    return (
      <NoteFilter />
    )
  }

  renderNoteList = () => {
    let noteListProps = {
      showModal           : this.state.showModal,
      showEditor          : this.state.showEditor,
      showFilters         : this.state.showFilters,
      onToggleShowModal   : this.onToggleShowModal,
      onToggleShowEditor  : this.onToggleShowEditor,
      onToggleShowFilters : this.onToggleShowFilters,
      caseComponents      : this.state.caseComponents,
      renderNoteFilter    : this.renderNoteFilter
    }
    return <NoteList { ...noteListProps } />
  }

  render() {
    return(
      <div>
        <NoteIcon onClick={ this.onToggleShowModal } />
        { this.state.showModal ? this.renderNoteList() : null }
      </div>
    )
  }
}
