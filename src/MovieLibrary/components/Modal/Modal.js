import React from 'react';
import './Modal.css';
import TMDBImage from '../TMDBImage';

const Modal = ({movie, onClickFunct}) => (
    <div className='container-modal'>
        <div className="modal-item">
            <TMDBImage src={movie.backdrop_path} className="poster-modal" />
            <div className="modal-description">
                <div>
                    <h2>{movie.name}</h2>
                    <div className='rows-modal'>
                        <h4>✭ </h4>
                        <span> {movie.vote_average} ({movie.vote_count} views) </span>
                        <span> - {movie.first_air_date.split('-').reverse().join('/')}</span>
                    </div>
                    <h5>Summary</h5>
                    <span className='overview'><p>{movie.overview}</p></span>
                </div>
            </div>
            <button onClick={onClickFunct} className='close-modal'>Close modal</button>
        </div>
    </div> 
  )

export default Modal
