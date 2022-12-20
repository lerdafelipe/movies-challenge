import React, { useState } from 'react'
import TMDBImage from './TMDBImage'
import './MoviesList.css'
import Banner from './Banner/Banner'
import Modal from './Modal/Modal'
import {useDispatch} from 'react-redux';
import {sortMovies} from '../store/actions';


export default function MoviesList ({ movies }){
  const dispatch = useDispatch();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortingType, setSortingType] = useState('');
  const handleSelectMovie = movie => setSelectedMovie(movie)
  const handleSortingChange = event => {
    setSortingType(event.target.value);
    let moviesSorted = []
    if(event.target.value === 'name_asc'){
      moviesSorted = movies.sort((a, b)=>{
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      })
      dispatch(sortMovies(moviesSorted))
    }else if (event.target.value === 'name_desc'){
      moviesSorted = movies.sort((a, b)=>{
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      })
      dispatch(sortMovies(moviesSorted))
    }else if (event.target.value === 'rating'){
      moviesSorted = movies.sort((a, b)=>{
        if (a.vote_average < b.vote_average) return 1;
        if (a.vote_average > b.vote_average) return -1;
        return 0;
      }) 
      dispatch(sortMovies(moviesSorted))
    }
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
        {
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
  const { name,  backdrop_path, first_air_date, poster_path } = movie
  const className = `movie-list-item ${isSelected ? 'selected' : ''}`
  return(
    <div className={className} onClick={handleClick}>
      <div>
        <div className="poster-item"><TMDBImage src={backdrop_path || poster_path}/></div>
        {name} 
        <p className='movie-date'>({first_air_date.split('-').reverse().join('/')})</p>
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

