import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let latitude, longitude;
  navigator.geolocation.getCurrentPosition( position  =>
    { latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      alert(latitude);    alert(longitude); },    ()  =>
    { latitude = 37.63;
      longitude = -122.46;
      alert(latitude);    alert(longitude); }         );
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
