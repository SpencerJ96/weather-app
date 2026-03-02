import { useState } from 'react' //Import UseState from React


//Prop the label of the package passed as component - Function whats inside the package
//SearchBar function that expects a prop passed by App (onSearch)
//TS part.
// { onSearch } destructuring the prop from App "onSearch={setSearchedCity} "so we can use it 
// this prop expects a parameter "city" and that parameter MUST Be a string and returns nothing
// This catches errors so if someone enters intergers it throws an error 
function SearchBar({ onSearch } : { onSearch: (city:string) => void}){ 
	const [city, setCity] = useState('') //UseState a react function that sets up a piece of memory
										 //And returns two things the current Value and an updater function


	return( 					
		<div className="flex justify-center p-8">{/* onChange watches for any typing in the input field, runs setCity
			  with whatever is in the input box */}						
			<input className="px-4 py-2 rounded-l-xl w-64 outline-none text-gray-800 bg-white" value={city} onChange={(e) => setCity(e.target.value)}/> 
			{/*(setCity has updated city state*/}
			{/* On click run our onSearch prop with the argument City (updated users value) */}
			<button className="px-4 py-2 rounded-r-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold" onClick={() => onSearch(city)}>Search</button>
		</div>
	)
}
export default SearchBar