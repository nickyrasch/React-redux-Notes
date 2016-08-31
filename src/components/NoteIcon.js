/* Created by alexdemars94 on 8/25/16. */

// React Stuff
import React from 'react'

// This is the main React component that will hold all state and methods for react-note
class NoteIcon extends React.Component {
  render() {
    return (
      <a href="#" onClick={ this.props.onClick }>
        <span style={{ alignSelf: 'stretch', fontSize: '200px' }}>Open Modal</span>
      </a>
    )
  }
}

module.exports = NoteIcon
