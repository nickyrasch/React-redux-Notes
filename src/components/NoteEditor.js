/* Created by alexdemars94 on 8/29/16. */

// React Stuff
import React from 'react'
import { Panel, Button, FormGroup, FormControl } from 'react-bootstrap'

class NoteEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Panel header={ 'Note Editor' } bsStyle={ 'primary' }>
        <form action="#">
          <FormGroup controlId="textarea">
            <FormControl componentClass={ 'textarea' } placeholder={ 'Note...' } style={{ resize: 'none' }}/>
            <Button bsStyle={ 'success' } style={{ float: 'right', marginTop: '8px', marginBottom: '-8px' }}>
              Add
            </Button>
          </FormGroup>
        </form>
      </Panel>
    )
  }
}

module.exports = NoteEditor
