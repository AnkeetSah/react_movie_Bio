import Input from "./components/Input";
import MovieContainer from "./components/MovieContainer";
import Heading from "./components/Heading";
import Suggestions from "./components/suggestions";
import { useEffect, useState } from "react";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [moviInfo, setMovieInfo] = useState({});
  const [shouldFetch, setShouldFetch] = useState(false);
  const [suggestionClicked, setSuggestionClicked] = useState(false);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(
          inputValue
        )}&apikey=80a71d62`
      );
      const data = await response.json();

      if (inputValue.toLowerCase() === data.Title.toLowerCase()) {
        setMovieInfo(data);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      if (inputValue.trim() !== "" ) {
        fetchMovieDetails();
      }
      setShouldFetch(false);
    }
  }, [shouldFetch, inputValue]);

  const fetchOnType = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(
          inputValue
        )}&apikey=80a71d62`
      );
      const data = await response.json();
      console.log(data);

      if (data.Search && data.Search.length > 0) {
        // Extracting movie titles from the search results
        const suggestions = data.Search.map((movie) => movie.Title);
        setSuggestions(suggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    if (inputValue && !suggestionClicked) {
      // Fetch suggestions only if inputValue is not empty and suggestion hasn't been clicked
      if (inputValue.trim() !== "") {
        fetchOnType();
      }
    }
  }, [inputValue, suggestionClicked]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setSuggestionClicked(false); // Reset the suggestionClicked state when input changes
  };

  const handleSuggestionClick = (suggestion) => {
    setSuggestions([]);
    setInputValue(suggestion);
    setShouldFetch(true);
    setSuggestionClicked(true); // Set suggestionClicked to true when suggestion is clicked
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSuggestions([]);
      // Trigger the suggestions fetching when Enter is pressed
      setShouldFetch(true);
    }
  };

  return (
    <>
      <Heading />
      <Input
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />
      <Suggestions
        handleSuggestionClick={handleSuggestionClick}
        suggestions={suggestions}
      />
      <MovieContainer moviInfo={moviInfo} />
    </>
  );
};

export default Header;











/*

import React, { useState, useEffect } from 'react';
import Styles from './Input.module.css';

export default function Input() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        // Replace the following with your actual API endpoint
        const response = await fetch(`https://www.omdbapi.com/?s=${inputValue}&apikey=80a71d62`);
        const data = await response.json();
        console.log(data);

        if (data.Search) {
          // Extracting movie titles from the response and setting suggestions
          const movieTitles = data.Search.map((movie) => movie.Title);
          setSuggestions(movieTitles);
        } else {
          setSuggestions([]); // Clear suggestions if no results
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    // Fetch suggestions only if inputValue is not empty
    if (inputValue.trim() !== '') {
      fetchSuggestions();
    } else {
      setSuggestions([]); // Clear suggestions if inputValue is empty
    }
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]); // Clear suggestions when a suggestion is clicked
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setInputValue(event.target.value);
      }
  };
  
  return (
    <>
      <div className={`${Styles.container} bg-dark`}>
        <form action="#">
          <label htmlFor="">Search Movie:</label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // Handle Enter key press
            placeholder="Search for movies..."
          />
        </form>
        <div>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
*/