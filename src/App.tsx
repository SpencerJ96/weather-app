import Header from './components/Header'
import SearchBar from './components/SearchBar'
import { useState } from 'react'

function App() {
	const [searchedCity, setSearchedCity] = useState('')
	console.log(searchedCity)
	return (
	<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 pt-8">
    <Header />
	<SearchBar onSearch={setSearchedCity} />
	</div>
  )
}

export default App