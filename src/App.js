import React, { Component } from 'react';
import NotesLibrary from './components/NotesLibrary'

class App extends Component {
  render() {
    return (
      <div>
        <NotesLibrary caseId={ 4821369 }/>
      </div>
    );
  }
}

export default App;
