import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const key = 'fd9d9c6418c23d94745b836767721ad1/';
  const ds = 'https://api.darksky.net/forecast/';
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  let lat, long;
  navigator.geolocation.getCurrentPosition(
    position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      alert(lat);
      alert(long);
      const api = `${proxy}${ds}${key}/${lat},${long}`;
      fetch(api).then(  response  =>  response.json() )
        .then( rInJSON => alert( rInJSON.timezone ) );
    },
    ()  =>  {
      lat = 37.63;
      long = -122.46;
      alert(lat);
      alert(long);
      const api = `${proxy}${ds}${key}/${lat},${long}`;
      fetch(api).then(  response  =>  response.json() )
        .then( rInJSON => alert( rInJSON.timezone ) );
    }
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          View the tutorial Hamir is using to create this
          web application <a href=
          'https://www.youtube.com/watch?v=wPElVpR1rwA'
          rel='noopener noreferrer'
          target='_blank'>here</a>.
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
