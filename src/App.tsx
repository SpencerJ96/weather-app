import Header from './components/Header'
import SearchBar from './components/SearchBar'
import { useState } from 'react'

function App() {
	const [searchedCity, setSearchedCity] = useState('')
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