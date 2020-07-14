import React, { useEffect, useState } from 'react';
import graySun from './foggy-day-sun.png';
import moon from './Full-Moon-PNG-Transparent-Img.png';
import sun from './the-sun-symbol.png';
import './App.css';

function App() {
  const [ weather , setWeather ] = useState();
  console.log('Latest build: Monday, July 13, 2020');
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
      const {icon, temperature, summary} = j.currently;
      setWeather(icon);                   } );  }

  function getImageFor(typeOfWeather)
  { if ( typeOfWeather === 'partly-cloudy-day' ||
      typeOfWeather==='cloudy'||typeOfWeather==='fog' )
      return <img src={graySun} className="App-logo"
        alt="gray sun" />;
        
    if (typeOfWeather === 'clear-day')
      return <img src={sun} className="App-logo"
        alt="sun" />;
    
    return <img src={moon} className="App-logo"
      alt="moon" />; }
  
  function getStylingFor(typeOfWeather)
  { let backgroundColor = 'black';
    let color = 'white';

    if ( typeOfWeather === 'partly-cloudy-day' ||
      typeOfWeather==='cloudy'||typeOfWeather==='fog' )
      backgroundColor = 'gray';
        
    if (typeOfWeather === 'clear-day')
    { backgroundColor = 'aqua';
      color = 'black'; }
    
    return {  backgroundColor , color }; }

  return (
    <div className="App">
      <header className="App-header"
        style={getStylingFor(weather)}>
        {getImageFor(weather)}
        {/* <h1 style={temperatureStyle}>74</h1> */}
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

// const temperatureStyle = {
//   alignItems: 'center',
//   backgroundColor: 'pink',
//   color: 'black',
//   display: 'flex',
//   fontSize: '10vmin',
//   height: '40vmin',
//   position: 'absolute',
// }

// const degreeStyle = {
//   backgroundColor: 'aqua',
//   fontSize: '20vmin',
//   height: '20vmin',
//   left: '65%',
//   position: 'absolute',
//   transform: 'translate(-50%, -50%)'
// }

export default App;
