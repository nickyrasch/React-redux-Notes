import React from 'react'

class NoteIcon extends React.Component {
  render() {
    return (
      <a href="#" onClick={ this.props.onClick }>
        <span className="btn btn-default" style={{ width: '640px', position: 'absolute', left: '50%', top: '15%', marginLeft: '-320px', fontSize: '110px' }}>
          Open Modal
        </span>
      </a>
    )
  }
}

module.exports = NoteIcon
