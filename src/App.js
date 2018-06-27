import React, { Component } from 'react';

import { xlsxToJson } from './services/xlsx-parser';
import Store from './services/store';
import logo from './logo.svg';
import './App.css';
import { defaultTribeNames } from './config'

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.state.tribes = [];
    this.state.tribesCount = 0;
  }

  filePicked = (ev) => {
    xlsxToJson(ev, this.fileParsed);
  }

  fileParsed = (parsedFile) => {
    Store.initStore(parsedFile[0]);
  }

  handleTribeNameChange = (index) => (ev) => {
    this.state.tribes[index] = ev.target.value;
    Store.setTribes(this.state.tribes);
    this.setState({ tribes: this.state.tribes });
  }

  tribesLength = (ev) => {
    const tribesCount = ev.target.value;
    
    if (tribesCount !== this.state.tribesCount) {
      tribesCount > this.state.tribesCount ? this.addTribes(tribesCount - this.state.tribesCount) : this.boundTribesTo(tribesCount)
      this.setState({tribesCount: ev.target.value});
    }
  }

  addTribes(newTribesCount) {
    for(let i = 0; i < newTribesCount; i ++){
      this.state.tribes.push("");
    }

    if(defaultTribeNames[this.state.tribes.length]) {
      this.state.tribes = defaultTribeNames[this.state.tribes.length];
    } 
    this.setState({ tribes: this.state.tribes });
    Store.setTribes(this.state.tribes);
  }

  boundTribesTo(boundTo) {
    this.state.tribes.length = boundTo;

    if(defaultTribeNames[this.state.tribes.length]) {
      this.state.tribes = defaultTribeNames[this.state.tribes.length];
    } 
    this.setState({ tribes: this.state.tribes });
    Store.setTribes(this.state.tribes);
  }

  downloadTribeFile = (index) => () => {
    Store.saveFile(index);
  }
  setParticipantsCount = (ev) => {
    Store.setParticipantsCount(ev.target.value);
  }
 
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <input type="number" value={this.state.tribesCount} onChange={this.tribesLength}/>
          <input type="number" onChange={this.setParticipantsCount}/>
        </div>
        {this.state.tribes.map((tribeName, index) => {
          return (<div key={`tribe${index}`}>
            <input min="0" max="12" type="text" value={this.state.tribes[index]} onChange={this.handleTribeNameChange(index)} />
            <button onClick={this.downloadTribeFile(index)}>Pobierz pliki plemienia</button>
          </div>)
        })}
        <input type="file" onChange={this.filePicked} />
        <button type="file" onChange={this.filePicked} >All</ button>
      </div>
    );
  }
}

export default App;
