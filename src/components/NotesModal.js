import React from 'react'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import NotesNav from './NotesNav'
import NotesList from './NotesList'
import { toggleModal } from '../actions/actions'


const NotesModal = ({ showModal, notes, toggleModal, caseName }) => (

        <Modal show={showModal} onHide={toggleModal} bsSize="lg">

          <Modal.Header closeButton>
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>Notes for: </span><span style={{ fontSize: "18px" }}>{caseName}</span>
          </Modal.Header>

          <Modal.Body>
              <NotesNav />
              <NotesList />
          </Modal.Body>

        </Modal>
      )

const mapStateToProps = (state) => {
    return {showModal: state.showModal,
            notes: state.notes,
            caseName: state.caseName
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        toggleModal: () => {
            dispatch(toggleModal())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NotesModal)