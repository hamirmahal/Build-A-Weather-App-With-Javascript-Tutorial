import React, { useEffect, useState } from 'react';
import graySun from './foggy-day-sun.png';
import moon from './Full-Moon-PNG-Transparent-Img.png';
import sun from './the-sun-symbol.png';
import umbrella from './OpenUmbrella_PNG_Clip_Art.png';
import './App.css';

export default function App() {
  const [ gTemp , setGlobalTemperature ] = useState(0);
  const [apiIsLoading, setAPIIsLoading]=useState(true);
  const [ summary , setSummary ] = useState();
  const [ tZone , setTimezone ] = useState();
  const [ units , setUnits ] = useState('F');
  const [ uType,setUnitType ] = useState('Fahrenheit');
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
      setGlobalTemperature(temperature);
      setSummary(summary);
      setTimezone(timezone);
      setWeather(icon);
      setAPIIsLoading(false);          }        );    }

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

  function toggleUnits()
  { if (units === 'F')
    { setGlobalTemperature( (gTemp - 32) / 1.8 );
      setUnits('C');    setUnitType('Celsius'); }
      
    if (units === 'C')
    { setGlobalTemperature( gTemp + 273.15 );
      setUnits('K'); setUnitType('Kelvin'); }

    if (units === 'K')
    { setGlobalTemperature((gTemp-273.15) * 1.8 + 32);
      setUnits('F');      setUnitType('Fahrenheit'); }}

  return ( <div className = "App">
    <header className = "App-header" style =
    {getStylingFor(weather)}> {getImageFor(weather)}
    {!apiIsLoading && <h1 className = "Temperature"
    onClick = {toggleUnits}>  {Math.round(gTemp)}°<abbr
    className="Unit" title={uType}>{units}</abbr></h1>}
    <p>{summary} <br/><br/>Timezone: {tZone} <br/><br/>
    <a href =
    'https://www.youtube.com/watch?v=wPElVpR1rwA'
    rel='noopener noreferrer' target='_blank'> View the
    tutorial</a> used to create this application.
    <br /> <br />I would like to thank <a href =
    'https://www.clipartqueen.com/sun-clipart.html'
    rel='noopener noreferrer' target='_blank'>
    ClipArtQueen</a> for the super sun clipart; thank
    you very much! My gratitude also goes toward <a
    href = 'https://gallery.yopriceville.com/'
    rel='noopener noreferrer' target='_blank'>Gallery 
    Yopriceville</a> for the useful umbrella image.
    And, a heartfelt thank-you goes out to <a href = 
    'https://www.pngarts.com/explore/31675'
    rel='noopener noreferrer' target='_blank'>PNG ARTS
    </a> for the marvelous moon .png!</p>
    <a className = "App-link"
    href = "https://darksky.net/poweredby/"
    rel="noopener noreferrer" target="_blank">
    Powered by Dark Sky</a> </header> </div> );       }