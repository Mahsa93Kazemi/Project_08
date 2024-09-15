import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [suggestedCities, setSuggestedCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const API_KEY = "b56338d30dceef2aa5e0592ecaa67cc7";

  const fetchCitySuggestions = async (userInput) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${API_KEY}`
      );

      const uniqueCities = [...new Set(response.data.map((city) => city.name))];
      setSuggestedCities(uniqueCities);
    } catch (error) {
      console.error("Error fetching city data:", error.message);
      setSuggestedCities([]);
    }
  };

  const handleChange = (e) => {
    const userInput = e.target.value;
    setInputValue(userInput);

    if (userInput) {
      fetchCitySuggestions(userInput);
    } else {
      setSuggestedCities([]);
    }
  };

  const handleCitySelect = (city) => {
    setInputValue(city);
    setSelectedCity(city);
    setSuggestedCities([]);
  };

  const getSuggestedText = () => {
    if (suggestedCities.length > 0 && inputValue.trim()) {
      const matchingCity = suggestedCities.find((city) =>
        city.toLowerCase().startsWith(inputValue.toLowerCase().trim())
      );
      if (matchingCity) {
        return matchingCity;
      }
    }
    return "";
  };

  return (
    <div className="main-container">
      <h1 className="title">City Search</h1>
      <div className="input-container">
        <input
          className="suggested-input"
          type="text"
          value={getSuggestedText()}
          disabled
        />
        <input
          className="user-input"
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search for a city"
        />
      </div>
      <ul className="suggestions-list">
        {suggestedCities.map((city, index) => (
          <li
            key={index}
            onClick={() => handleCitySelect(city)}
            className="suggestion-item"
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
