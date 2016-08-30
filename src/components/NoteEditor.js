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

  static propTypes = {
    showEditor         : React.PropTypes.bool.isRequired,
    onToggleShowEditor : React.PropTypes.func.isRequired,
    noteContent        : React.PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        { this.props.showEditor ? <ReactSimpleRTE noteContent={ this.props.noteContent }/> : null }
      </div>
    )
  }
}

module.exports = NoteEditor
