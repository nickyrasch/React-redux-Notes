/* Created by alexdemars94 on 8/25/16. */

import React from 'react';
import { Panel } from 'react-bootstrap'

class Note extends React.Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    noteContent: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <Panel bsStyle="primary">
        { this.props.noteContent }
      </Panel>
    )
  }
}

module.exports = Note