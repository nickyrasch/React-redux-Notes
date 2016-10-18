import React from 'react'
import { connect } from 'react-redux'
import {  Button } from 'react-bootstrap'
import { addNote, toggleAddNote, getInitialColor, updateContent, updateTitle, updateColor } from '../actions/actions'
import NoteColorPicker from '../components/NoteColorPicker'

class AddNote extends React.Component {
componentDidMount() {
    tinymce.init({
        selector: 'textarea.tinymce',
        plugins: 'code textcolor link fullscreen table',
        toolbar: 'fontsizeselect | bold italic underline strikethrough forecolor backcolor | bullist numlist table | link code | fullscreen help',
        fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
        statusbar: false,
        menubar: false,
        resize: true,
        min_height: 200,
        setup: (editor) => {
            editor.on('init', function () {
                editor.focus();
                editor.selection.select(editor.getBody(), true);
                editor.selection.collapse(null, null);
                let doc = this.getDoc().body
                doc.style.fontSize = '14px'
                doc.style.fontFamily = 'Helvetica Neue, Helvetica'
                let container = this.getContainer()
                container.style.borderWidth = '0px'
                container.style.marginBottom = '3px'
            })
            editor.on('blur', (e) => {
                e.preventDefault()
                let newContent = e.target.getContent()
                this.props.updateContent(newContent);
            })
        }
    })
}

render() {
        let newid = 0
        if (this.props.notes.length > 0) {
            let noteslength = this.props.notes.length
            let lastnote = this.props.notes[noteslength - 1]
            newid = lastnote.id
        }
        let currentColor = 'default'
        if (currentColor !== this.props.updatedColor) {
            currentColor = this.props.updatedColor}
        return (
            <div className={ 'panel panel-' + currentColor }>
                <div className={ 'panel-heading' }>New Note</div>
                <div className={ 'panel-body' } style={{padding: '0'}}>
                    <input
                        type="text"
                        placeholder={ 'Title...' }
                        style={{ width: '100%', height: '32px', border: 'none' }}
                        onBlur={ (e) => {this.props.updateTitle(e.target.value)} }
                    />
                    <textarea ref={ 'tinymce' } className={ 'tinymce' } />
                </div>
                <div className={ 'panel-footer' } style={{height: '60px'}}>
                    <NoteColorPicker updateColor={this.props.updateColor} />
                    <Button bsStyle={ 'success' } className={ 'pull-right' } style={{ marginRight: '15px' }} onClick={() => { if (this.props.updatedContent.length) this.props.addNote(this.props.updatedContent, newid, this.props.updatedTitle, currentColor); this.props.toggleAddNote() } }>Save</Button>
                    <Button className={ 'pull-right' } style={{ marginRight: '15px' }} onClick={() => this.props.toggleAddNote()}>Cancel</Button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, style) => {
    return {notes: state.notes,
            style: style,
            updatedColor: state.updatedColor,
            updatedContent: state.updatedContent,
            updatedTitle: state.updatedTitle
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addNote: (updatedContent, newid, titleValue, currentColor) => {
            dispatch(addNote(updatedContent, newid, titleValue, currentColor))},
        toggleAddNote: () => {
            dispatch(toggleAddNote())},
        getInitialColor: (color) => {
            dispatch(getInitialColor(color))},
        updateContent: (updatedContent, currentContent) => {
            dispatch(updateContent(updatedContent, currentContent))},
        updateTitle: (updatedTitle) => {
            dispatch(updateTitle(updatedTitle))},
        updateColor: (updatedColor) => {
            dispatch(updateColor(updatedColor))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddNote)