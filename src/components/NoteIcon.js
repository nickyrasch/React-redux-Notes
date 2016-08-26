/* Created by alexdemars94 on 8/25/16. */

// React Stuff
import React from 'react'
import { Modal, Button } from 'react-bootstrap'

// This is the main React component that will hold all state and methods for react-note
class NoteIcon extends React.Component {
  render() {
    return (
      <a href="javascript:" onClick={ this.props.onClick }>
        Open Modal
      </a>
    )
  }
}

module.exports = NoteIcon
