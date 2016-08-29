import React, { Component } from 'react';
import NotesLibrary from './components/NotesLibrary'

class App extends Component {
  render() {
    return (
      <div>
        <NotesLibrary caseId={ 4823556 }/>
      </div>
    );
  }
}

export default App;
