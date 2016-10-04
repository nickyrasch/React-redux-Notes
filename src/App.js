import React, { Component } from 'react';
import NotesLibrary from './components/NotesLibrary'

class App extends Component {
  render() {
    return (
      <div>
        <NotesLibrary caseId={ 744095 }/>
      </div>
    );
  }
}

export default App;
