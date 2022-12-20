import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTopRatedMovies} from '../store/actions';
import logo from './logo.svg';
import './MovieLibrary.css';
import MoviesList from './MoviesList';

export default function MovieLibrary() {
  const movies = useSelector(state => state.movies.movies);
  const dispatch = useDispatch();

  
  useEffect(async() => {
    await fetch('https://api.themoviedb.org/3/tv/popular?api_key=54ffed57deb5a7a8688be4de3007e578')
      .then(data => data.json())
      .then(dat => {
        console.log(dat.results)
        dispatch(fetchTopRatedMovies(dat.results));
      })
  }, [])

  return(
    <div className="MovieLibrary">
      <header className="ML-header">
        <img src={logo} className="ML-logo" alt="logo" />
        <h1 className="ML-title">Movies</h1>
      </header>
      <div className="ML-intro">
        { movies !== undefined && movies !== null && movies.length && <MoviesList movies={movies}/> }
      </div>
    </div>)
}
