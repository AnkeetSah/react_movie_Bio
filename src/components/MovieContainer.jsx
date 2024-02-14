// MovieContainer.js
import React from "react";
import Styles from "./MovieContainer.module.css";

const MovieContainer = ({ moviInfo }) => {
  const {
    Poster,
    Title,
    Year,
    Rated,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    imdbRating,
    imdbVotes,
    imdbID,
    Type,
    Released,
  } = moviInfo;

  return (
    <div
      className={`${Styles.container} ${
        Title ? `${Styles.withTitle}` :`${Styles.withoutTitle} ${Styles.backgroundAnimation}`
      }`}
    >
      {/* Rest of your component code */}
      {Title ? (
        <>
           <div className={`${Styles.child1} ${Styles.child}`}>
            <img src={Poster} alt="Movie" />
          </div>
          <div className={`${Styles.child2} ${Styles.child}`}>
            <br />
            <h2 className={`${Styles.title}`}>{Title}</h2>
            <p>
              <span className={`${Styles.details}`}>Release Date:</span>{" "}
              {Released}
            </p>{" "}
            <p className={`${Styles.genre}`}>
              {" "}
              <span className={`${Styles.details} `}>Genre:</span> {Genre}
            </p>
            <p>
              {" "}
              <span className={`${Styles.details}`}>Director:</span> {Director}
            </p>
            <p>
              <span className={`${Styles.details}`}>Writer:</span> {Writer}
            </p>
            <p>
              <span className={`${Styles.details}`}>Actors:</span> {Actors}
            </p>
            <p>
              <span className={`${Styles.details}`}>RunTime:</span> {Runtime}
            </p>
            <p>
              <span className={`${Styles.details}`}>Type:</span> {Type}
            </p>
            <p>
              <span className={`${Styles.details}`}>Language:</span> {Language}
            </p>
            <p className={`${Styles.imdb}`}>
              <span className={`${Styles.details}`}>imdbRating:</span>{" "}
              {imdbRating}
            </p>
            <p>
              <span className={`${Styles.details}`}>Awards:</span> {Awards}
            </p>
            <p>
              <span className={`${Styles.details}`}>Plot:</span> {Plot}
            </p>
          </div>
        </>
      ) : (
        <>
          <h1 className={Styles.prevBox}>
            Effortlessly access comprehensive movie information.
          </h1>
        </>
      )}
    </div>
  );
};

export default MovieContainer;
