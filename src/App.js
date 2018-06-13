import React, { Component } from 'react';

import { xlsxToJson } from './services/xlsx-parser';
import Store from './services/store';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  filePicked = (ev) => {
    xlsxToJson(ev, this.fileParsed);
  }

  fileParsed = (parsedFile) => {
    Store.initStore(parsedFile[0]);
  }
 
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <input type="file" onChange={this.filePicked} />
      </div>
    );
  }
}

export default App;
