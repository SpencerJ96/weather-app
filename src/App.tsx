import Header from './components/Header'
import SearchBar from './components/SearchBar'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
	{/*State declarations */}
	const [searchedCity, setSearchedCity] = useState('')
	const [weatherData, setWeatherData] = useState(null)

	useEffect(() => {
		async function fetchWeather(){ if (!searchedCity) return
			
			const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`)
			const data = await response.json()
			setWeatherData(data)
		}
		fetchWeather()
	}, [searchedCity])

	return (
	<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 pt-8">
    <Header />
	{/* {city/userinput} from SearchBar.ts passed into {setSearchedCity} from the onSearch function
	running in searchBar.ts 
	 which stores the input into searchedCity apps state */}
	<SearchBar onSearch={setSearchedCity} />
	</div>
  )
}

export default App