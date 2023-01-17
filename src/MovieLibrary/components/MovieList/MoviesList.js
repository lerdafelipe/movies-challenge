import React, { useState } from 'react'
import TMDBImage from '../TMDBImage'
import './MoviesList.css'
import Banner from '../Banner/Banner'
import Modal from '../Modal/Modal'
import {fetchMovies, sortMovies} from '../../store/actions';
import { useDispatch } from 'react-redux'


export default function MoviesList ({ movies }){
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortingType, setSortingType] = useState('');
  const handleSelectMovie = movie => setSelectedMovie(movie)

  const handleSortingChange = event => {
    sortMovies(event.target.value);
    setSortingType(event.target.value);
    fetchMovies(sortMoviesFunct(movies, event.target.value));
  }

  return(<div className="movies-list">
    <div className="items">
      <Banner movie={movies[5]}/>
      {
        selectedMovie && (
          <Modal onClickFunct={()=>setSelectedMovie(null)} movie={selectedMovie} />
        )
        }
      <div className='sorter-container'>
        <span>Sort by:</span>
        <SortingOptions selectedOption={sortingType} onChange={handleSortingChange}/>
      </div>
      <div className='movies-container'>
        { movies &&
          movies.map(movie =>
            <MovieListItem key={movie.id} movie={movie} isSelected={selectedMovie===movie} onSelect={handleSelectMovie}/>
          )
        }
      </div>
    </div>
  </div>)

  
}


function MovieListItem ({movie, isSelected, onSelect}) {
  const handleClick = () => onSelect(movie)
  const { title,  backdrop_path, release_date, poster_path } = movie
  const className = `movie-list-item ${isSelected ? 'selected' : ''}`
  return(
    <div className={className} onClick={handleClick}>
      <div>
        <div className="poster-item"><TMDBImage src={backdrop_path || poster_path}/></div>
        {title} 
        <p className='movie-date'>({release_date.split('-').reverse().join('/')})</p>
      </div>
    </div>)
}

function SortingOptions ({ selectedOption, onChange }) {

  return (
    <select className='select-css' value={selectedOption} onChange={onChange}>
      <option value=""></option>
      <option value="name_asc">A to Z</option>
      <option value="name_desc">Z to A</option>
      <option value="rating">Rating</option>
    </select>
  )
}

const sortMoviesFunct = (movies, SortType) =>{
  let moviesArray = [];

  if(SortType === "name_asc"){
    moviesArray =  movies.sort((a, b)=>{
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    });
  }
  else if (SortType === "name_desc"){
    moviesArray =  movies.sort((a, b)=>{
      if (a.title < b.title) return 1;
      if (a.title > b.title) return -1;
      return 0;
    });
  }else if (SortType === "rating"){
    moviesArray =  movies.sort((a, b)=>{
      if (a.vote_average < b.vote_average) return 1;
      if (a.vote_average > b.vote_average) return -1;
      return 0;
    });
  }

  return moviesArray;
}