/* Created by alexdemars94 on 8/29/16. */

// React Stuff
import React from 'react'
// import { Panel, Button, FormGroup, FormControl } from 'react-bootstrap'

// Components
import ReactSimpleRTE from './ReactSimpleRTE'

class NoteEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ReactSimpleRTE />
    )
  }
}

module.exports = NoteEditor
