/* Created by alexdemars94 on 8/29/16. */

// React Stuff
import React from 'react'
import { Button, Grid, Row, Col, InputGroup, FormControl } from 'react-bootstrap'

// Custom Components
import NoteFilter from './NoteFilter'

class NoteSearch extends React.Component {
  static propTypes = {
    showFilter: React.PropTypes.bool.isRequired
  }

  static defaultProps = {
    newNoteOnOpen : false,
    editNoteOnOpen: false,
    searchable    : true,
    typeFilters   : ['CASE_NOTE', 'ANNOTATION'],
    sharingFilters: []
  }

  componentDidMount() {
    console.log("%cNoteSearch has been mounted.", "color:#58B957;")
  }

  componentWillUnmount() {
    console.log("%cNoteSearch has been unmounted.", "color:#DB524B;")
  }

  renderNoteFilter = () => {
    return (
      <NoteFilter />
    )
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
                  onChange={ this.props.onChangeSearchTerm }
                  style={{ marginBottom: '16px' }}
                />

                <InputGroup.Button style={{ width: '32px' }}>
                  <Button style={{ marginBottom: '16px', width: '100%' }} onClick={ this.props.onToggleShowFilter }>
                    Filters
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </Col>
            <Col sm={ 2 }>
              <Button onClick={ this.props.onSearch } bsStyle={ 'primary' } style={{ marginBottom: '16px', width: '100%' }}>
                Search
              </Button>
            </Col>
            <Col sm={ 2 }>
              <Button onClick={ this.props.onToggleShowEditor } bsStyle={ 'success' } style={{ marginBottom: '16px', width: '100%' }}>
                Add Note
              </Button>
            </Col>
          </Row>
        </Grid>
        { this.props.showFilter ? this.renderNoteFilter() : null }
      </form>
    )
  }
}

module.exports = NoteSearch
