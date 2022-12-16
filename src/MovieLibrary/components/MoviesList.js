import React, { useState } from 'react'
import TMDBImage from './TMDBImage'
import './MoviesList.css'
import Banner from './Banner/Banner'
import Modal from './Modal/Modal'

export default function MoviesList ({ movies }){
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [sortingType, setSortingType] = useState('');
  const handleSelectMovie = movie => setSelectedMovie(movie)
  const handleSortingChange = event => {
    setSortingType(event.target.value)
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
  const { title, vote_average, backdrop_path, release_date } = movie
  const className = `movie-list-item ${isSelected ? 'selected' : ''}`
  return(
    <div className={className} onClick={handleClick}>
      <div>
        <TMDBImage src={backdrop_path}/>
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

