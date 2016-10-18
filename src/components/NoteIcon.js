import React from 'react'
import {connect} from 'react-redux'
import { toggleModal } from '../actions/actions'

const NoteIcon = ({ toggleModal }) => {
    return (
      <a href="#" onClick={ toggleModal }>
        <span className="btn btn-default" style={{  position: 'absolute', left: '50%', top: '15%', marginLeft: '-320px', fontSize: '80px' }}>
          Start<strong> notes!</strong>
        </span>
      </a>
    )
}

const mapStateToProps = (state) => {
    return {state}
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleModal: () => {
            dispatch(toggleModal())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteIcon)