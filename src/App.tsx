import Header from './components/Header'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastCard, { type ForecastEntry } from './components/ForecastCard'
					//"TYPE" tells ts this import is only used for type checking not at runtime
import { useState } from 'react'
import { useEffect } from 'react'


function App() {
	{/*State declarations */}
	const [searchedCity, setSearchedCity] = useState('')
	const [weatherData, setWeatherData] = useState(null)
	const [errorMessage, setErrorMessage] = useState ('')
	const [isLoading, setIsLoading] = useState (false)
	const [forecastData, setForecastData] = useState <ForecastEntry[]>([])
	const [isCelsius, setIsCelsius] = useState(true)
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

			const forecastResponse = await fetch (` https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`)
			const forecastData = await forecastResponse.json()
			setForecastData(forecastData.list)

		}
		fetchWeather()
	}, [searchedCity])
       //Listen For Changes To This State, When it Happens RUN THIS CODE. Dependency Array^^^ 
	



	   //JSX Expressions
	return (
	<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 pt-8">
		
    <Header />

	{/* {userinput} from SearchBar.ts passed into {setSearchedCity} from the onSearch function
	running in searchBar.ts 
	 which stores the input into searchedCity apps state */}
	<SearchBar onSearch={setSearchedCity} />
	
	{/* Convertion Button
		On click run this function "=>" Inside the Expression {}
		  run the state updater function setIsCelsius and flip the boolean value(Logical NOT operator"!").
		  *Ternary Operation* 
		  If isCelsius current state is TRUE [Celsius is displayed] Display "switch to F".
		  Else, [isCelsius state is FALSE] display Switch to C
		  */}
	<div className="flex justify-center mb-10">
		<button className="px-4 py-2 rounded-r-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold"
		onClick={() => setIsCelsius(!isCelsius)}>
		{isCelsius ? "Switch to °F" :"Switch to °C"}</button>
	</div>

	{isLoading && <p className="text-sky-300 text-center px-2 py-2">Loading...</p>}

	{ /* Conditional rendering.
	 If the Left side is true, do it. If weatherData exists, make weather card */ }

	{weatherData && <WeatherCard data = {weatherData} isCelsius = {isCelsius} />}
	{ /* Conditional rendering.
	 If the Left side is true, do it. If errorMessage exists, make error text display*/ }

	{/* Create expression with the app states forecastData
		Apply a filter (call every item entry while we work with it
		Only include entrys that includes "12:00:00") 
		.map loops through every filtered entry and creates a forecastcard comp
		pass in every entry to this function as a prop called forecast*/}
	<div className="flex justify-center gap-4 flex-wrap mt-10">

	{forecastData
		.filter((entry) => entry.dt_txt.includes("12:00:00"))
		.map((entry) => (
			<ForecastCard key={entry.dt_txt} forecast={entry} isCelsius = {isCelsius} />
		))}
	</div>

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