import { useState } from 'react' //Import UseState from React

function SearchBar(){ //Component function for search bar
	const [city, setCity] = useState('') //UseState a reaction function that sets up a piece of memory
										 //And returns two things the current Value and an updater function


	return( 					
		<div>{/* onChange watches for any typing in the input field, runs setCity
			  with whatever is in the input box */}						
			<input value={city} onChange={(e) => setCity(e.target.value)}/> 
			<button onClick={() => console.log(city)}>Search</button>
		</div>
	)
}
export default SearchBar