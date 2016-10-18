import React from 'react'
import { Button, Grid, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import {connect} from 'react-redux'
import NoteFilter from './NoteFilter'
import { onChangeSearchTerm, toggleFilter, toggleAddNote, updateColor, updateTitle, toggleEditor } from '../actions/actions'
import AddNote from '../containers/AddNote'

const renderNoteFilter = () => {
    return (
        <NoteFilter />
    )
}

const renderAddNote = () => {
    return (
        <AddNote />
    )
}

const NotesNav = ({ searchTerm, onChangeSearch, toggleFilter, toggleEditor, showFilter, note, toggleAddNote, showAddNote, updateColor, updateTitle }) => (
<div>
      <form action="#" className={ 'form-inline' }>
        <Grid fluid>
          <Row>
            <Col sm={ 10 }>
              <InputGroup style={{ width: '100%' }}>
                <FormControl
                  autoFocus
                  type={ 'text' }
                  placeholder={ 'Search...' }
                  value={ searchTerm }
                  onChange={ (event) => onChangeSearch(event.target.value) }
                  style={{ marginBottom: '16px' }}
                />

                <InputGroup.Button style={{ width: '32px' }}>
                  <Button style={{ marginBottom: '16px', width: '100%' }} onClick={ toggleFilter }>
                    Filters
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </Col>
            <Col sm={ 2 }>
              <Button bsStyle={ 'success' } style={{ marginBottom: '16px', width: '100%' }} onClick={() => {updateColor('default', 'default'); updateTitle(""); toggleEditor(); toggleAddNote()}}>
                Add Note
              </Button>
            </Col>
          </Row>
        </Grid>
        { showFilter ? renderNoteFilter() : null }
      </form>
        { showAddNote ? renderAddNote() : null }
</div>

)

const mapStateToProps = (state) => {
  return {searchTerm: state.searchTerm,
          showFilter: state.showFilter,
          showAddNote: state.showAddNote
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onChangeSearch: (value) => {
            dispatch(onChangeSearchTerm(value))
        },
        toggleFilter: () => {
            dispatch(toggleFilter())
        },
        toggleAddNote: () => {
            dispatch(toggleAddNote())
        },
        updateColor: (resetToDefault, currentColor) => {
            dispatch(updateColor(resetToDefault, currentColor))
        },
        toggleEditor: (id) => {
            dispatch(toggleEditor(id))
        },
        updateTitle: (updatedTitle) => {
            dispatch(updateTitle(updatedTitle))
        }

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NotesNav)