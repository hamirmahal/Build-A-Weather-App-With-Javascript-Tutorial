import React, { useEffect, useState } from 'react';
import moon from './Full-Moon-PNG-Transparent-Img.png';
import sun from './the-sun-symbol.png';
import './App.css';

function App() {
  const [itIsDaytime, setTimeOfDay] = useState(false);
  const key = 'fd9d9c6418c23d94745b836767721ad1/';
  const ds = 'https://api.darksky.net/forecast/';
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  useEffect(                                  ()  =>  {
    navigator.geolocation.getCurrentPosition(
      position  =>                                  {
        let { latitude, longitude } = position.coords;
        alert(latitude);
        alert(longitude);
        const coordinate = `/${latitude},${longitude}`;
        const api = `${proxy}${ds}${key}${coordinate}`;
        fetch(api).then( response => response.json() )
          .then( rJSON => {
            console.log(rJSON);
            console.log(rJSON.currently);
            console.log(rJSON.currently.time);
            console.log(rJSON.daily);
            console.log(rJSON.daily.data);
            console.log(rJSON.daily.data[0]);
            const { sunriseTime, sunsetTime } = 
              rJSON.daily.data[0];
            const { time } = rJSON.currently;
            if ( sunriseTime <= time <= sunsetTime)
              setTimeOfDay(true);              } ); },
      ()  =>                                   {
        let latitude = 37.63;
        let longitude = -122.46;
        alert(latitude);
        alert(longitude);
        const coordinate = `/${latitude},${longitude}`;
        const api = `${proxy}${ds}${key}${coordinate}`;
        fetch(api).then( response => response.json() )
          .then( rJSON =>         {
            console.log(rJSON);
            console.log(rJSON.currently);
            console.log(rJSON.currently.time);
            console.log(rJSON.daily);
            console.log(rJSON.daily.data);
            console.log(rJSON.daily.data[0]);
            const { sunriseTime, sunsetTime } = 
              rJSON.daily.data[0];
            const { time } = rJSON.currently;
            if ( sunriseTime <= time <= sunsetTime)
              setTimeOfDay(true);});});} )
  return (
    <div className="App">
      <header className="App-header" style={{
      backgroundColor: itIsDaytime ? 'aqua':'black',
      color: itIsDaytime && 'black'}}>
        { itIsDaytime ? <img src={sun}
          className="App-logo" alt="sun" /> : <img
          src={moon} className="App-logo" alt="moon"/>}
        <p>
          View the tutorial Hamir is using to create
          this web application <a href=
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
