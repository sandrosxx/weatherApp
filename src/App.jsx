import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import img from './componentes/img'

function App() {
  const [weather, setWeather] = useState({})
  const [change, setChange] = useState(true)
 
  useEffect(()=>{

    const success = pos => {
            const lat = pos.coords.latitude
            const lon =pos.coords.longitude
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7abcad11460649b3339e1beaba6fb8ab`)
    .then(res=>setWeather(res.data));
    }
    navigator.geolocation.getCurrentPosition(success);
  }, [])
  console.log(weather)
 
  return (
    <div className="App">
      <div className="card"> 
        <h1>Weather App</h1>
        <h2>Country:{' '}{weather.sys?.country} - City:{' '} {weather.name}</h2>
      </div>
      <div className='icon'>
          <h3>{weather.weather?.[0].description}</h3>
          <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
      </div>
      <div className='Temp'>
          <h1 >
              {change ? ((weather.main?.temp)-273.15).toFixed() : (((weather.main?.temp)-273.15)*9/5+32).toFixed()}
               {change ? '°C' : '°F'}
          </h1>
      </div>
      <div className='max'>
          <h3 >
            Max
            {' '} {change ? ((weather.main?.temp_max)-273.15).toFixed() : (((weather.main?.temp_max)-273.15)*9/5+32).toFixed()}
            {change ? '°C' : '°F'}
        </h3>
      </div>
      <div className='min'>
          <h3 >
            Min
            {' '} {change ? ((weather.main?.temp_min)-273.15).toFixed() : (((weather.main?.temp_min)-273.15)*9/5+32).toFixed()}
             {change ? '°C' : '°F'}
          </h3>
      </div>
      <div className='humidity'>
          <h4 >
            Humidity{' '}{weather.main?.humidity}%
          </h4>
      </div>
      <div className='feelslike'>
          <h4 >
          Feels like
          {' '}{change ?((weather.main?.feels_like)-273.15).toFixed() : (((weather.main?.feels_like)-273.15)*9/5+32).toFixed()}
          {change ? '°C' : '°F'}
          </h4>
      </div>
      <div className='wind'>
          <h4 >
            Wind speed{' '}{weather.wind?.speed} m/s   
          </h4>
      </div>
      <button className='btn' onClick={()=>setChange(!change)}>°C | °F</button>
      
    </div>
  )
}

export default App
