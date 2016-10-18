import React from 'react'
import {connect} from 'react-redux'
import { Panel } from 'react-bootstrap'
import { toggleEditor, toggleAddNote, updateColor, updateContent, updateTitle } from '../actions/actions'
import NoteEditor from '../containers/NoteEditor'


const Note = ({ note, arrayPosition, toggleEditor, toggleAddNote, updateColor, showAddNote, updateContent, updateTitle }) => {

    if (note.showEditor === true) {
        return <NoteEditor note={note} arrayPosition={arrayPosition} />
    }

    let panelHeader =  () => {
        if (note.title.length) {
            return <h5 className="panelHeading"><strong>{note.title}</strong></h5>
        }
    }

    return (
        <Panel className="notePanel" bsStyle={note.style} onClick={() => {updateColor('default', note.style); updateContent(note.content); updateTitle(note.title); showAddNote ? toggleAddNote(false) : null; toggleEditor(note.id);}}>
                <div style={{ padding: '30px 0 15px 0' }}>
                    {panelHeader()}
                    <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
                </div>
        </Panel>
    )
}

const mapStateToProps = (state) => {
  return {showAddNote: state.showAddNote}
}
const mapDispatchToProps = (dispatch) => {
    return {
        toggleEditor: (id) => {
            dispatch(toggleEditor(id))
        },
        updateColor: (resetToDefault, currentColor) => {
            dispatch(updateColor(resetToDefault, currentColor))
        },
        toggleAddNote: (off) => {
            dispatch(toggleAddNote(off))
        },
        updateContent: (updatedContent) => {
            dispatch(updateContent(updatedContent))
        },
        updateTitle: (updatedTitle) => {
            dispatch(updateTitle(updatedTitle))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Note)
