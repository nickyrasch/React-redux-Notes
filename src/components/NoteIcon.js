import React from 'react'

const NoteIcon = ({ toggleModal }) => {
    return (
      <a href="#" onClick={ toggleModal }>
        <span className="btn btn-default" style={{  position: 'absolute', left: '50%', top: '15%', marginLeft: '-320px', fontSize: '80px' }}>
          Start<strong> notes!</strong>
        </span>
      </a>
    )
}

export default NoteIcon
