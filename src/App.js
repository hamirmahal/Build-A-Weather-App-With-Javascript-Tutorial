import React, { useEffect, useState } from 'react';
import blueSun from './rainy-day-sun.png';
import graySun from './foggy-day-sun.png';
import moon from './Full-Moon-PNG-Transparent-Img.png';
import sun from './the-sun-symbol.png';
import './App.css';

function App() {
  const [ weather , setWeather ] = useState();
  const key = 'fd9d9c6418c23d94745b836767721ad1/';
  const ds = 'https://api.darksky.net/forecast/';
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  
  useEffect(() => getAndAnalyzeLatitudeAndLongitude());
  function getAndAnalyzeLatitudeAndLongitude()
  { navigator.geolocation.getCurrentPosition( pos =>
    extractWithProvided(pos), extractWithDefault() ); }

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
    fetch(apiURL).then(resp => resp.json()).then(j => {
      console.log(j.currently);
      const {icon, summary, temperature} = j.currently;
      setWeather(icon);
      console.log(j);
      const timezone = { j }; }                 );    }

  function getImageFor(typeOfWeather)
  { if (typeOfWeather === 'clear-day')
      return <img src={sun} className="App-logo"
        alt="sun" />;
    
    if ( typeOfWeather === 'partly-cloudy-day' ||
      typeOfWeather==='cloudy'||typeOfWeather==='fog' )
      return <img src={graySun} className="App-logo"
        alt="gray sun" />;

    if (typeOfWeather === 'rain')
      return <img src={blueSun} className="App-logo"
        alt="blue sun" />;

    return <img src={moon} className="App-logo"
      alt="moon" />; }
  
  function getStylingFor(typeOfWeather)
  { let backgroundColor = 'black';
    let color = 'white';
        
    if (typeOfWeather === 'clear-day')
    { backgroundColor = 'aqua';
      color = 'black'; }

    if ( typeOfWeather === 'partly-cloudy-day' ||
      typeOfWeather==='cloudy'||typeOfWeather==='fog' )
      backgroundColor = 'gray';
        
    if (typeOfWeather === 'rain')
    { backgroundColor = 'blue';
      color = 'black'; }
    
    return {  backgroundColor , color }; }

  return (
    <div className="App">
      <header className="App-header"
        style={getStylingFor(weather)}>
        {getImageFor(weather)}
        <h1 className="Temperature">
          74°<abbr className="Unit" title='Fahrenheit'>
          F</abbr></h1>
        <p>
          <a  href  =
          'https://www.youtube.com/watch?v=wPElVpR1rwA'
          rel='noopener noreferrer' target='_blank'>
          View the tutorial</a> Hamir is using to
          create this web application.
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
