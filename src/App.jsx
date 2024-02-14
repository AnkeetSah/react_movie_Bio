import React, { useEffect, useReducer, useState } from "react";


import Input from "./components/Input";
import MovieContainer from "./components/MovieContainer";
import Heading from "./components/Heading";
import Suggestions from "./components/Suggestions";

const initialState = {
  inputValue: "",
  suggestions: [],
  movieInfo: {},
  shouldFetch: false,
  suggestionClicked: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT_VALUE":
      return { ...state, inputValue: action.payload, suggestionClicked: false };
    case "SET_SUGGESTIONS":
      return { ...state, suggestions: action.payload };
    case "SET_MOVIE_INFO":
      return { ...state, movieInfo: action.payload };
    case "SET_SHOULD_FETCH":
      return { ...state, shouldFetch: action.payload };
    case "SET_SUGGESTION_CLICKED":
      return { ...state, suggestionClicked: action.payload };
    default:
      return state;
  }
};

const Header = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { inputValue, suggestions, movieInfo, shouldFetch, suggestionClicked } =
    state;

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(
          inputValue
        )}&apikey=80a71d62`
      );
      const data = await response.json();

      if (inputValue.toLowerCase() === data.Title.toLowerCase()) {
        dispatch({ type: "SET_MOVIE_INFO", payload: data });
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      if (inputValue.trim() !== "") {
        fetchMovieDetails();
      }
      dispatch({ type: "SET_SHOULD_FETCH", payload: false });
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

      if (data.Search && data.Search.length > 0) {
        const suggestions = data.Search.map((movie) => movie.Title);
        dispatch({ type: "SET_SUGGESTIONS", payload: suggestions });
      } else {
        dispatch({ type: "SET_SUGGESTIONS", payload: [] });
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    if (inputValue && !suggestionClicked) {
      if (inputValue.trim() !== "") {
        fetchOnType();
      }
    }
  }, [inputValue, suggestionClicked]);

  const handleInputChange = (event) => {
    dispatch({ type: "SET_INPUT_VALUE", payload: event.target.value });
  };

  const handleSuggestionClick = (suggestion) => {
    dispatch({ type: "SET_SUGGESTIONS", payload: [] });
    dispatch({ type: "SET_INPUT_VALUE", payload: suggestion });
    dispatch({ type: "SET_SHOULD_FETCH", payload: true });
    dispatch({ type: "SET_SUGGESTION_CLICKED", payload: true });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch({ type: "SET_SUGGESTIONS", payload: [] });
      dispatch({ type: "SET_SHOULD_FETCH", payload: true });
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
      <MovieContainer moviInfo={movieInfo} />
    </>
  );
};

export default Header;
