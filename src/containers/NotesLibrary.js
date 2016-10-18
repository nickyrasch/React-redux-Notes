import React, { Component } from 'react'
import { connect } from 'react-redux'
import NotesModal from '../components/NotesModal'
import NoteIcon from '../components/NoteIcon'
import { getInitialColor, getCaseName } from '../actions/actions'

class NotesLibrary extends Component {

  componentDidMount() {
    // this.getCaseComponents()
    this.props.getInitialColor()
    this.props.getCaseName()
    console.log("%cNotes Library has been mounted with props:", "color:#58B957;", this.props)

  }

  renderNotesModal = () => {
    return <NotesModal />
  }

  render() {
    return(
      <div>
        <NoteIcon />
        {this.props.state.showModal ? this.renderNotesModal() : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {state}
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInitialColor: () => {
      dispatch(getInitialColor())
    },
    getCaseName: () => {
      dispatch(getCaseName())
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NotesLibrary)
