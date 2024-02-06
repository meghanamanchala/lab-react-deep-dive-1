import { useState, useEffect } from 'react';
import countryData from './resources/countryData.json';

function App() {
  const [inputText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27) {
        setShowSuggestions(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleSearch = (event) => {
    const text = event.target.value;
    setSearchText(text);
    const filteredSuggestions = countryData.filter(country =>
      country.name.toLowerCase().startsWith(text.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleSearch}
        placeholder="Search country"
      />
      {showSuggestions && (
        <ul>
          {suggestions.map((country, index) => (
            <li key={index}>{country.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
