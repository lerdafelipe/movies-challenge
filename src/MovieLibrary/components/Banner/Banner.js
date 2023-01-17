import React from 'react';
import TMDBImage from '../TMDBImage';
import './Banner.css';

const Banner = ({movie: {title,  backdrop_path, poster_path, overview, vote_average, vote_count}}) => (
    <div className="banner-item">
      <TMDBImage src={backdrop_path || poster_path} className="poster" />
      <div className="description">
        <div>
          <TMDBImage src={poster_path || backdrop_path} className="poster-img" />
        </div>
        <div>
          <h2>{title}</h2>
          <div className='rows'>
            <h4>✭ </h4>
            <span> {vote_average} ({vote_count})</span>
          </div>
          <span>{overview.slice(0, 500)}...</span>
        </div>
      </div>
    </div>
)

export default Banner;
