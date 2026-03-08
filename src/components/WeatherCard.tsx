// Data the prop we're destructuring
								//type annotation (tell JSX The shape). main is an object with properties inside
								//Therefore you have to describe that inner object, the same with weather
function WeatherCard ({ data, isCelsius } : { data:  { name: string, main: { temp: number}, weather: {description: string, icon: string} [] }, isCelsius: boolean }) {
	return (
		<div className="items-center shadow-xl px-6 py-8 gap-4 flex flex-col justify-center bg-gray-800 max-w-xs mx-auto rounded-xl">
			<h2 className="px-4 py-2 text-center font-semibold text-lg tracking-wider bg-sky-500 text-white rounded-full">{data.name}</h2>
			<p className="text-4xl font-bold text-white text-center ">{isCelsius ? `${data.main.temp}°C` : ` ${( data.main.temp * 9/5 + 32 ).toFixed(1) } °F `}</p>
			<p className="bg-gray-700 text-gray-300 rounded-full px-4 py-2 text-center text-sm">{data.weather[0].description}</p>
			<img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}/>
		</div>
	)
}

export default WeatherCard