// { forecast } passing it in as a parameter and destructuring
//Every item needs to be definied dt_txt: is a string. main : has temp and its a number, weather has a description - an arrary of strings

//Attempt at interfaces - Typescript type definition only exists are compile never run
// ForecastEntry MUST be this shape. Export to app so parent knows.

export interface ForecastEntry{
	dt_txt:string
	main: { temp : number }
	weather: {description: string } []
}

// forecast = our imported/prop'd entry from app. EACH forecast entry must look like this shape.

function ForecastCard ({ forecast } : {forecast: ForecastEntry} ){
	return (
		<div className="items-center shadow-xl px-6 py-8 gap-4 flex flex-col justify-center bg-gray-800 max-w-xs mx-auto rounded-xl">
			<h2 className="px-4 py-2 text-center font-semibold text-lg tracking-wider bg-sky-500 text-white rounded-full">{forecast.dt_txt}</h2>
			<p className="text-4xl font-bold text-white text-center ">{forecast.main.temp} °C</p>
			<p className="bg-gray-700 text-gray-300 rounded-full px-4 py-2 text-center text-sm">{forecast.weather[0].description}</p>
		</div>
	)
}

export default ForecastCard