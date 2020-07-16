import React, { useEffect, useState } from 'react';
import graySun from './foggy-day-sun.png';
import moon from './Full-Moon-PNG-Transparent-Img.png';
import sun from './the-sun-symbol.png';
import umbrella from './OpenUmbrella_PNG_Clip_Art.png';
import './App.css';

export default function App() {
  const [ summary, setSummary ] = useState();
  const [ temperature, setTemperature ] = useState();
  const [ timezone, setTimezone ] = useState();
  const [ weather , setWeather ] = useState('');
  const key = 'fd9d9c6418c23d94745b836767721ad1/';
  const ds = 'https://api.darksky.net/forecast/';
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  
  useEffect( () => analyzeLatitudeAndLongitude(), [] );
  function analyzeLatitudeAndLongitude()
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
      const { timezone } = j;           console.log(j);
      const {icon, summary, temperature} = j.currently;
      console.log(j.currently);
      setSummary(summary);
      setTemperature(temperature);
      setTimezone(timezone);
      setWeather(icon);                }        );    }

  function getImageFor(typeOfWeather)
  { let alt = "sun"; let c = "App-logo"; let src = sun;
    
    if(typeOfWeather==='cloudy'||typeOfWeather==='fog')
    { alt="gray sun";                    src=graySun; }
    
    if (typeOfWeather.includes('night'))
    { alt="moon";                           src=moon; }

    if(typeOfWeather==='rain'||typeOfWeather==='sleet')
    { alt="umbrella";                   src=umbrella; }

    return <img src={src} className={c} alt={alt} />; }
  
  function getStylingFor(typeOfWeather)
  { let backgroundColor = 'skyblue';
    let color = 'white';

    if(typeOfWeather==='cloudy'||typeOfWeather==='fog')
      backgroundColor = 'gray';

    if (typeOfWeather.includes('night'))
      backgroundColor = 'black';
        
    if(typeOfWeather==='rain'||typeOfWeather==='sleet')
      backgroundColor = 'dark blue';
    
    if (typeOfWeather === 'snow')
    { backgroundColor = 'white';     color = 'black'; }
    
    return { backgroundColor , color };               }

  return (
    <div className="App">
      <header className="App-header"
        style={getStylingFor(weather)}>
        {getImageFor(weather)}
        <h1 className="Temperature"> {temperature}
          °<abbr className="Unit" title='Fahrenheit'>
          F</abbr></h1>
        <p>
          {summary}
          <br />
          <br />
          Timezone: {timezone}
          <br />
          <br />
          <a  href  =
          'https://www.youtube.com/watch?v=wPElVpR1rwA'
          rel='noopener noreferrer' target='_blank'>
          View the tutorial</a> Hamir is using to
          create this web application.
        </p>
        <a 
          className="App-link"
          href="https://darksky.net/poweredby/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Dark Sky
        </a>
      </header>
    </div>
  );
}