import React, { Component } from 'react';
import './App.css';
import NotesLibrary from './NotesLibrary'

class App extends Component {
  render() {
    return (
      <div >
        <NotesLibrary caseId={742955}/>
      </div>
    );
  }
}

export default App;
