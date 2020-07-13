import React, { useEffect, useState } from 'react';
import moon from './Full-Moon-PNG-Transparent-Img.png';
import sun from './the-sun-symbol.png';
import './App.css';

function App() {
  const [itIsDaytime,setItIsDaytime] = useState(false);
  const key = 'fd9d9c6418c23d94745b836767721ad1/';
  const ds = 'https://api.darksky.net/forecast/';
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  
  useEffect(() => getAndAnalyzeLatitudeAndLongitude());
  function getAndAnalyzeLatitudeAndLongitude()
  { navigator.geolocation.getCurrentPosition( p =>
    extractWithProvided(p), extractWithDefault()  );  }

  function extractWithProvided(userPosition)
  { const { latitude,longitude } = userPosition.coords;
    extractFromAPI( latitude, longitude ); }

  function extractWithDefault()
  { const defaultLatitude = 37.63;
    const defaultLongitude = -122.46;
    extractFromAPI(defaultLatitude, defaultLongitude);}

  function extractFromAPI( efLatitude , efLongitude )
  { console.log(efLatitude);
    console.log(efLongitude);
    const coordinate = `/${efLatitude},${efLongitude}`;
    const apiURL = `${proxy}${ds}${key}${coordinate}`;
    fetch(apiURL).then(r => r.json()).then(j => {
      console.log(j);
      console.log(j.currently);
      console.log(j.currently.time);
      console.log(j.daily);
      console.log(j.daily.data);
      console.log(j.daily.data[0]);
      const {sunriseTime,sunsetTime} = j.daily.data[0];
      const {temperature, time, summary} = j.currently;
      if ( sunriseTime <= time && time <= sunsetTime )
        setItIsDaytime(true);                   } );  }

  return (
    <div className="App">
      <header className="App-header" style={{
      backgroundColor: itIsDaytime ? 'aqua':'black',
      color:itIsDaytime&&'black',position:'relative'}}>
        { itIsDaytime ? <img src={sun}
          className="App-logo" alt="sun" /> : <img
          src={moon} className="App-logo" alt="moon"/>}
        <h1 style={temperatureStyle}>74</h1>
        {/* <h1 style={degreeStyle}>°</h1> */}
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

const temperatureStyle = {
  // backgroundColor: 'pink',
  color: 'black',
  fontSize: '20vmin',
  height: '30vmin',
  left: '50%',
  position: 'absolute',
  top: '30%',
  transform: 'translate(-50%, -50%)'
}

// const degreeStyle = {
//   backgroundColor: 'aqua',
//   fontSize: '20vmin',
//   height: '20vmin',
//   left: '65%',
//   position: 'absolute',
//   transform: 'translate(-50%, -50%)'
// }

export default App;
