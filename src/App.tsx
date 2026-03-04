import Header from './components/Header'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
	{/*State declarations */}
	const [searchedCity, setSearchedCity] = useState('')
	const [weatherData, setWeatherData] = useState(null)
	const [errorMessage, setErrorMessage] = useState ('')
	const [isLoading, setIsLoading] = useState (false)

	//React Hook. 
	useEffect(() => {
		async function fetchWeather(){ if (!searchedCity) return
			
			setIsLoading(true)
			const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`)
			const data = await response.json()
			setIsLoading(false)
			
			if (data.cod === "404") {
				setErrorMessage ("Please Enter A Valid City")
				return
			}
			setErrorMessage('')
			setWeatherData(data)
		}
		fetchWeather()
	}, [searchedCity])
       //Listen For Changes To This State, When it Happens RUN THIS CODE. Dependency Array^^^ 
	
	   //JSX Expressions
	return (
	<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 pt-8">
    <Header />
	{/* {city/userinput} from SearchBar.ts passed into {setSearchedCity} from the onSearch function
	running in searchBar.ts 
	 which stores the input into searchedCity apps state */}
	<SearchBar onSearch={setSearchedCity} />
	{isLoading && <p className="text-sky-300 text-center px-2 py-2">Loading...</p>}
	{ /* Conditional rendering.
	 If the Left side is true, do it. If weatherData exists, make weather card */ }
	{weatherData && <WeatherCard data = {weatherData} />}
	{ /* Conditional rendering.
	 If the Left side is true, do it. If errorMessage exists, make error text display*/ }
	{errorMessage && <p className="font-bold text-red-500 text-center px-2 py-2">{errorMessage}</p>}
	</div>
  )
}

{/*User searches "London"
→ SearchBar calls onSearch("London")
→ App's searchedCity updates to "London"
→ useEffect detects the change, runs fetchWeather
→ fetchWeather calls the API, gets response
→ response stored in local variable `data`
→ setWeatherData(data) saves it to React state as `weatherData`
→ App passes `weatherData` to WeatherCard as a prop called `data`
→ WeatherCard displays `data.name` on screen */}

export default App