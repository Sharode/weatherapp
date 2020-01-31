import React, { useState } from 'react';
const api = {
  key: '000b7c246f3b0d54300ff5f8306acc67',
  base: 'https:/api.openweathermap.org/data/2.5/find?'
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [metrics, setMetrics] = useState('imperial')
  const [b_image, setB_Image] = useState('')

  const search = async (evt) => {
    if (evt.key === 'Enter') {
      const response = await fetch(`${api.base}q=${query}&units=metric&APPID=${api.key}`)
      const result = await response.json()
      setWeather(result);
      setQuery('')
      setB_Image(background(result))

    }

  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];

    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  const handleClick = async (e) => {
    metrics === 'imperial' ? setMetrics('metric') : setMetrics('imperial')
  }

  const temp = () => {

    if (metrics === 'metric') {
      return (Math.floor(weather.list[0].main.temp))
    }
    if (metrics === 'imperial')
      return Math.floor(((weather.list[0].main.temp * (1.8)) + 32))

  }


  const background = (data) => {
    let bg = ''

    switch (data.list[0].weather[0].main) {
      case 'Clear':
        bg = 'app clear'
        break
      case 'Rain':
        bg = 'app rainy'
        break
      case 'Clouds':
        bg = 'app cloudy'
        break
      case 'Sunny':
        bg = 'app sunny'

        break
      case 'Snow':
        bg = 'app clear'
        break
      default:
        bg = 'app warm'
        break
    }
    return bg
  }

  return (
    <div className={(weather.message === 'undefined')
      ? 'app'
      : (weather.message === 'accurate')
        ? (b_image)
        : 'app'} >
      <main>
        <div className="search-box">
          <input type="" className='search-bar' placeholder='type in city.... then Press Enter' onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
          <button
            className={metrics === 'metric' ? 'true' : 'false'}
            disabled={metrics !== 'metric'}
            onClick={(e) => handleClick(e)}>Fahrenheit°</button>
          <button
            className={metrics !== 'metric' ? 'true' : 'false'}
            disabled={metrics === 'metric'}
            onClick={(e) => handleClick(e)}>Celcius°
            </button>
        </div>
        {(weather.message === "accurate" && weather.list.length > 0) ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.list[0].name}, {weather.list[0].sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {temp()}°{metrics === 'metric' ? 'C' : 'F'}
              </div>
              <div className="weather">{weather.list[0].weather[0].main}</div>
            </div>
          </div>
        ) : ('')}

      </main>
    </div>
  );
}

export default App;
