import React from 'react'
import {  Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import  NoteColorPicker  from '../components/NoteColorPicker'
import { toggleEditor, saveEdit, updateContent, updateTitle, deleteNote } from '../actions/actions'

class NoteEditor extends React.Component {
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
    let id = this.props.note.id
    let currentContent = this.props.note.content
    if (currentContent !== this.props.updatedContent) {
        currentContent = this.props.updatedContent
    }
    let currentTitle = this.props.note.title
    if (currentTitle !== this.props.updatedTitle) {
        currentTitle = this.props.updatedTitle
    }
    let currentColor = this.props.note.style
    if (currentColor !== this.props.updatedColor) {
        currentColor = this.props.updatedColor
    }

    return (
        <div className={ 'editNotePanel panel panel-' + currentColor }>
            <div className={ 'panel-heading' }>Edit Note</div>
            <div className={ 'panel-body' } style={{padding: '0'}}>
                <input
                    type="text"
                    placeholder="Title..."
                    defaultValue={ currentTitle }
                    style={{width: '100%', height: '32px'}}
                    onBlur={(e) => {
                        this.props.updateTitle(e.target.value)
                    }}
                />
                <textarea ref={ 'tinymce' } className={ 'tinymce' } defaultValue={ currentContent } />
            </div>
            <div className={ 'panel-footer' } style={{height: '60px'}}>
                <NoteColorPicker />
                <Button bsStyle={ 'danger' } className={ 'pull-right' } onClick={ () => this.props.deleteNote(this.props.note.id, this.props.arrayPosition) }>Delete</Button>
                <Button bsStyle={ 'success' } className={ 'pull-right' } style={{marginRight: '15px'}} onClick={() => {this.props.saveEdit(id, currentContent, currentTitle, currentColor)}}>Save</Button>
                <Button className={ 'pull-right' } style={{marginRight: '15px'}} onClick={() => {this.props.toggleEditor(this.props.note.id)
                }}>Cancel</Button>
            </div>
        </div>
      )
   }
}

const mapStateToProps = (state) => {
  return {updatedColor: state.updatedColor,
          updatedContent: state.updatedContent,
          updatedTitle: state.updatedTitle
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleEditor: (id) => {
      dispatch(toggleEditor(id))},
    saveEdit: (id, currentContent, title, currentColor) => {
      dispatch(saveEdit(id, currentContent, title, currentColor))},
    updateContent: (updatedContent, currentContent) => {
      dispatch(updateContent(updatedContent, currentContent))},
    updateTitle: (updatedTitle) => {
      dispatch(updateTitle(updatedTitle))},
    deleteNote: (id, arrayPosition) => {
      dispatch(deleteNote(id, arrayPosition))}
  }}

export default connect(mapStateToProps,mapDispatchToProps)(NoteEditor)