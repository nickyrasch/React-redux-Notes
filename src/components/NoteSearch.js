/* Created by alexdemars94 on 8/29/16. */

// React Stuff
import React from 'react'
import { Button, Grid, Row, Col, InputGroup, FormControl } from 'react-bootstrap'

class NoteSearch extends React.Component {
  static defaultProps = {
    newNoteOnOpen : false,
    editNoteOnOpen: false,
    searchable    : true,
    typeFilters   : ['CASE_NOTE', 'ANNOTATION'],
    sharingFilters: []
  }

  render() {
    return (
      <form action="#" className={ 'form-inline' }
          onSubmit={this.onSearch}
          style={ this.props.searchable ? {} : { display: 'none' }}>
        <Grid fluid>
          <Row>
            <Col sm={ 8 }>
              <InputGroup style={{ width: '100%' }}>
                <FormControl
                  type={ 'text' }
                  placeholder={ 'Search...' }
                  onChange={ this.onChangeSearchTerm }
                  style={{ marginBottom: '16px' }}
                />

                <InputGroup.Button style={{ width: '32px' }}>
                  <Button style={{ marginBottom: '16px', width: '100%' }} onClick={ this.onToggleFilters }>
                    Filters
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </Col>
            <Col sm={ 2 }>
              <Button onClick={ this.onSearch } bsStyle={ 'primary' } style={{ marginBottom: '16px', width: '100%' }}>
                Search
              </Button>
            </Col>
            <Col sm={ 2 }>
              <Button onClick={ this.onAddNote } bsStyle={ 'success' } style={{ marginBottom: '16px', width: '100%' }}>
                Add Note
              </Button>
            </Col>
          </Row>
        </Grid>
      </form>
    )
  }
}

module.exports = NoteSearch
