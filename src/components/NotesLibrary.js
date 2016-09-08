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

  getCaseComponents = (id, index, callback) => {
    let headers = {'Authorization': `Basic ${btoa('admin:@pass$')}`}
    if (id) {
      let url = `https://jtidev-config.ecourt.com/sustain/ws/rest/ecourt/search/CaseNote/id/${ id }?depth=1&includeClobs=true`
      fetch(url, {
        method: 'GET',
        headers : headers
      })
        .then((res) => res.json())
        .then((caseComponentData) => {
          let caseComponent = caseComponentData[0]
          let updatedCaseComponents = [...this.state.caseComponents]
          updatedCaseComponents.splice(index, 1, caseComponent)
          this.setState({caseComponents: updatedCaseComponents}, () => callback()) // callback sets note's loading state
        })
    }
    else {
      let url = `https://jtidev-config.ecourt.com/sustain/ws/rest/ecourt/search/CaseNote/case.id/${ this.props.caseId }?depth=1&includeClobs=true`
      fetch(url, {
        method : 'GET',
        headers: headers
      })
        .then((res) => res.json())
        .then((caseComponentData) => {
          this.updateCaseComponentArray(caseComponentData, (caseComponentData) => {
            this.setState({caseComponents: caseComponentData})
          })
        })
    }
  }

  updateCaseComponentArray = (array, callback) => {
    array.forEach((item, i) => {
      console.log('Component', item)
      // Setting showEditor in the caseComponent object makes showing the editor for each note easy
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
      getCaseComponents   : this.getCaseComponents,
      renderNoteFilter    : this.renderNoteFilter
    }
    return <NoteList { ...noteListProps } />
  }

  render() {
    console.log('State components in render:', this.state.caseComponents)
    return(
      <div>
        <NoteIcon onClick={ this.onToggleShowModal } />
        { this.state.showModal ? this.renderNoteList() : null }
      </div>
    )
  }
}
