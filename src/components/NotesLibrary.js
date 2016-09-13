/* Created by alexdemars94 on 8/26/16. */

// React Stuff
import React, { Component } from 'react'

// Custom Components
import NoteList from './NoteList'
import NoteIcon from './NoteIcon'

// This is the main React component that will hold all state and methods for react-note
export default class NotesLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal      : true,
      showEditor     : false,
      showFilter     : false,
      searchTerm     : '',
      headers        : {'Content-Type': 'application/json', 'Authorization': `Basic ${btoa('admin:@pass$')}`},
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

  onToggleShowModal  = () => this.setState({ showModal: !this.state.showModal }) // Super slick one-liner
  onToggleShowEditor = () => this.setState({ showEditor: !this.state.showEditor }) // So slick
  onToggleShowFilter = () => this.setState({ showFilter: !this.state.showFilter }) // Awwww yeah

  onChangeSearchTerm = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  onChangeNoteColor = (color, id) => {
    this.state.caseComponents.forEach((component, index) => {
      if (component.id === id) {
        const updatedComponent = { ...component, color }
        console.log('Component with updated color:', updatedComponent)
        const array = [ ...this.state.caseComponents ]
        array.splice(index, 1, updatedComponent)
        this.setState({ caseComponents: array })
      }
    })
  }

  onChangeNoteTitle = (title, id) => {
    this.state.caseComponents.forEach((component, index) => {
      if (component.id === id) {
        const updatedComponent = { ...component, title }
        console.log('Component with updated title:', updatedComponent)
        const array = [ ...this.state.caseComponents ]
        array.splice(index, 1, updatedComponent)
        this.setState({ caseComponents: array })
      }
    })
  }

  onChangeNoteContent = (content, id) => {
    this.state.caseComponents.forEach((component, index) => {
      if (component.id === id) {
        const updatedComponent = { ...component, content }
        console.log('Component with updated content:', updatedComponent)
        const array = [ ...this.state.caseComponents ]
        array.splice(index, 1, updatedComponent)
        this.setState({ caseComponents: array })
      }
    })
  }

  // *******************************************************************************************************************
  // ==================================================== API CALLS ====================================================
  // *******************************************************************************************************************

  onSearch = () => {
    const url = this.state.searchTerm ?
      `https://jtidev-config.ecourt.com/sustain/ws/rest/ecourt/search/CaseNote/title/~%25${ this.state.searchTerm }%25?includeClobs=true&depth=1&maxResults=10`
      : `https://jtidev-config.ecourt.com/sustain/ws/rest/ecourt/search/CaseNote/?includeClobs=true&depth=1&maxResults=10`
    fetch(url, {
      method : 'GET',
      headers: this.state.headers
    })
      .then((res) => res.json())
      .then((caseComponentData) => {
        this.setState({ caseComponents: caseComponentData })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getCaseComponents = (id, index, callback) => {
    if (id) {
      let url = `https://jtidev-config.ecourt.com/sustain/ws/rest/ecourt/search/CaseNote/id/${ id }?depth=1&includeClobs=true`
      fetch(url, {
        method: 'GET',
        headers : this.state.headers
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
        headers: this.state.headers
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

    // this.state = {
    //   showEditor        : false,
    //   caseComponent     : this.props.caseComponent,
    //   content           : this.props.caseComponent.content,
    //   title             : this.props.caseComponent.title,
    //   initialPanelColor : this.getNoteColor(this.props.caseComponent.color.toUpperCase()),
    //   panelColor        : this.props.caseComponent.color,
    //   loading           : false
    // }

    array.forEach((item, i) => {
      console.log('Component', item)
      // Setting showEditor in the caseComponent object makes showing the editor for each note easy
      item.showEditor = false
      if (i === array.length - 1) {
        callback(array)
      }
    })
  }

  onSaveNote = (id, index, callback) => {
    let componentToSave = {}
    this.state.caseComponents.forEach((component) => {
      if (component.id === id) {
        componentToSave = component
      }
    })
    let url = `https://jtidev-config.ecourt.com/sustain/ws/rest/ecourt/entities/CaseNote/${ id }`
    fetch(url, {
      method : "PUT",
      headers: this.state.headers,
      body: JSON.stringify({
        content : componentToSave.content,
        color   : componentToSave.color,
        title   : componentToSave.title
      })
    })
      .then((res) => res.json()) // Convert response data to  json
      .then(() => {
        this.getCaseComponents(componentToSave.id, index, callback)
      })
  }

  // *******************************************************************************************************************
  // ================================================= RENDER METHODS ==================================================
  // *******************************************************************************************************************

  renderNoteList = () => {
    let noteListProps = {
      caseComponents      : this.state.caseComponents,
      showModal           : this.state.showModal,
      showEditor          : this.state.showEditor,
      showFilter          : this.state.showFilter,
      searchTerm          : this.state.searchTerm,
      onToggleShowModal   : this.onToggleShowModal,
      onToggleShowEditor  : this.onToggleShowEditor,
      onToggleShowFilter  : this.onToggleShowFilter,
      onChangeSearchTerm  : this.onChangeSearchTerm,
      onChangeNoteColor   : this.onChangeNoteColor,
      onChangeNoteTitle   : this.onChangeNoteTitle,
      onChangeNoteContent : this.onChangeNoteContent,
      onSaveNote          : this.onSaveNote,
      onSearch            : this.onSearch,
      getCaseComponents   : this.getCaseComponents
    }
    return <NoteList { ...noteListProps } />
  }

  render() {
    console.log('Application State:', this.state)

    return(
      <div>
        <NoteIcon onClick={ this.onToggleShowModal } />
        { this.state.showModal ? this.renderNoteList() : null }
      </div>
    )
  }
}
