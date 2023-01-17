import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovies} from '../../store/actions';
import logo from '../logo.svg';
import './MovieLibrary.css';
import MoviesList from '../MovieList/MoviesList';

export default function MovieLibrary() {
  const movies = useSelector(state => state.movies);
  const dispatch = useDispatch();
  const [page, setPage] = useState(3);
  const [loading, setLoading] = useState(true);

  const handlePage = () =>{
      if(window.scrollY + window.innerHeight === window.document.querySelector('body').offsetHeight){
        setLoading(true)
        setPage(prev => prev+1);
      }
  }


  
  useEffect(() => {
    fetchMoviesFunct(page, dispatch, movies);
    setLoading(false);
  }, [page]);

  useEffect(()=>{
    window.addEventListener('scroll', handlePage);

    return ()=> window.removeEventListener('scroll', handlePage);
  }, [])


  return(
    <div className="MovieLibrary">
      <header className="ML-header">
        <img src={logo} className="ML-logo" alt="logo" />
        <h1 className="ML-title">Movies</h1>
      </header>
      <div className="ML-intro">
        { movies !== undefined && movies !== null && movies.length && <MoviesList movies={movies}/> }
        {loading && <div className='loader-container'><div className='loader'></div></div>}
      </div>
    </div>)
}



const fetchMoviesFunct = async (page, dispatch, movies)=>{
  if(page === 3){
    let movs = []
    for (let index = 1; index < 4; index++) {
      await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=54ffed57deb5a7a8688be4de3007e578&page=${index}`)
      .then(data => data.json())
      .then(dat => movs = [...movs, ...dat.results])
    }
    dispatch(fetchMovies(movs))
  }else{
    await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=54ffed57deb5a7a8688be4de3007e578&page=${page}`)
    .then(data => data.json())
    .then(dat =>  dispatch(fetchMovies([...movies, ...dat.results])))
  }
}