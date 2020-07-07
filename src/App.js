import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(i => {
      console.log(i);
      alert('Location discernible');              } );
  else  { alert('Location indiscernible!')  }
  alert('End of if-else block');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
