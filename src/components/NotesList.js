import React from 'react'
import {connect} from 'react-redux'
import Note from './Note'

const NotesList = ({notes, searchTerm}) => {
    let notesSearch = notes
    let filteredNotes = notesSearch.filter(
        (notesSearch) => {
            return notesSearch.content.indexOf(searchTerm) !== -1;
        }
    )
    return (
    <div>
        {filteredNotes.map((note, i) => (
            <Note key={i} arrayPosition={i} note={note} />
        ))}
    </div>
    )
}

const mapStateToProps = (state) => {
    return {notes: state.notes,
            searchTerm: state.searchTerm
    }
}

export default connect(mapStateToProps)(NotesList)