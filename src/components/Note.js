/* Created by alexdemars94 on 8/25/16. */

import React from 'react';
import { Panel, Button } from 'react-bootstrap'

class Note extends React.Component {
  static propTypes = {
    noteContent: React.PropTypes.string.isRequired
  }

  log = () => {
    console.log(this.props)
  }

  render() {
    return (
      <Panel bsStyle="default">
        { this.props.noteContent }
        <Button style={{ float: 'right' }} onClick={ this.log }>
          ↰
        </Button>
      </Panel>
    )
  }
}

module.exports = Note