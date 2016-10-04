import React from 'react';
import { Panel, Button, Grid, Row, Col, ButtonGroup } from 'react-bootstrap'
// Custom Components
import NoteEditor from './NoteEditor'

class Note extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading    : false
    }
  }

  static propTypes = {
    caseComponent     : React.PropTypes.object.isRequired,
    getCaseComponents : React.PropTypes.func.isRequired
  }

  componentWillMount() {
    console.log("%cNote is about to be mounted to DOM.", "color:#3E8ACC;")
  }

  componentDidMount() {
    console.log("%cNote has been mounted with caseComponent:", "color:#58B957;", this.props.caseComponent)
  }

  componentWillUnmount() {
    console.log("%cNote has been unmounted.", "color:#DB524B;")
  }

  toggleLoading = () => this.setState({ loading: !this.state.loading })

  onToggleShowEditor = () => this.setState({ showEditor: !this.state.showEditor })

  // onCancel = () => {
  //   this.onToggleShowEditor()
  // }

  onSave = () => {
    this.toggleLoading()
    this.props.onToggleShowEditor()
    this.props.onSaveNote(this.props.caseComponent.id, this.props.index, this.toggleLoading)
  }

  editorGetNoteColor = (color) => this.getBootstrapStyle(color, 'editor')

  getBootstrapStyle = (hexCode) => {
    // Get the hexcode from the caseComponent and use it to set a bsStyle on the Panel component
    let possibleStyles = [
      { code: '#E7E7E7', style: 'default' },
      { code: '#DB524B', style: 'danger' },
      { code: '#F2AE43', style: 'warning' },
      { code: '#58B957', style: 'success' },
      { code: '#5cb85c', style: 'success' },
      { code: '#3E8ACC', style: 'primary' },
      { code: '#428bca', style: 'primary' }
    ]
    let panelColor
    possibleStyles.forEach((color) => {
      if (color.code.toUpperCase() === hexCode.toUpperCase()) {
        panelColor = color
      }
    })
    return panelColor.style
  }

  renderActivityIndicator = () => {
    return (
      <span style={{ fontSize: '14px' }}>
        <span>{ this.props.caseComponent.title }</span>
        <span className={ 'pull-right' }>Loading...</span>
      </span>
    )
  }

  renderEditor = () => {
    let noteEditorProps = {
      caseComponent       : this.props.caseComponent,
      onToggleShowEditor  : this.props.onToggleShowEditor,
      onChangeNoteColor   : this.props.onChangeNoteColor,
      onChangeNoteContent : this.props.onChangeNoteContent,
      onChangeNoteTitle   : this.props.onChangeNoteTitle,
      // onCancel            : this.onCancel,
      onSave              : this.onSave,
      getNoteColor        : this.editorGetNoteColor,
      header              : 'Edit Note'
    }
    return (
      <div style={{ marginTop: '10px' }}>
        <NoteEditor { ...noteEditorProps }/>
      </div>)
  }

  renderNoteButtons = () => {
    return (
      <ButtonGroup style={{ position: 'absolute', right: '0' }}>
        <Button onClick={ this.onToggleShowEditor }>Edit</Button>
      </ButtonGroup>
    )
  }

  renderNote = () => {
    return(
      <Panel className="notePanel" bsStyle={ this.getBootstrapStyle(this.props.caseComponent.color) } header={ this.state.loading ? this.renderActivityIndicator() : this.props.caseComponent.title }>

        <Grid fluid>
          <Row style={{ height: '34px' }}>
            <Col sm={ 9 } xs={ 7 }>
              <div dangerouslySetInnerHTML={{ __html: this.props.caseComponent.content }}></div>
            </Col>
            <Col sm={ 3 } xs={ 5 }>
              { this.renderNoteButtons() }
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  }

  render() {

    return (
      <div>
        { this.state.showEditor ? this.renderEditor() : null }
        { !this.state.showEditor ? this.renderNote() : null }
      </div>
    )
  }
}

module.exports = Note
