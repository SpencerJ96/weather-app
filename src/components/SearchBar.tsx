import { useState } from 'react' //Import UseState from React

//SearchBar function that expects a prop (onSearch)
//{TS part. onSearch is a function/prop that takes 1 argument (city thats a string and returns nothing)

function SearchBar({ onSearch }: { onSearch: (city:string) => void}){ 
	const [city, setCity] = useState('') //UseState a react function that sets up a piece of memory
										 //And returns two things the current Value and an updater function


	return( 					
		<div>{/* onChange watches for any typing in the input field, runs setCity
			  with whatever is in the input box */}						
			<input value={city} onChange={(e) => setCity(e.target.value)}/> 
			{/*(setCity has updated city state*/}
			{/* On click run our onSearch prop with the argument City (users value) */}
			<button onClick={() => onSearch(city)}>Search</button>
		</div>
	)
}
export default SearchBar