import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import MovieModal from './MovieModal';

function MovieList({searchItem}) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [selectedMovieID, setselectedMovieID] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState("");
const [loading, setloading] = useState(false);
const [page, setpage] = useState(1);
const [isSearching, setisSearching] = useState(false);
const bottomRef = useRef(null);
 
useEffect(() => {
if(searchItem.trim()){
  searchMovies(searchItem);
}else{
  setMovieList([]);
  setpage(1);
  setisSearching(false);
  fetchMovies(1);
}
 // eslint-disable-next-line
}, [searchItem]);

const searchMovies=async (search)=>{
  try{
    setloading(true);
    setisSearching(true);
     setMovieList([]);
    const res = await axios.get(
  `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(search)}`
);
    setMovieList(res.data.results);
  }catch(err){
    setError('Search Failed');
  }finally{
    setloading(false);
  }
};

    const fetchMovies=async (page) => {
      try {
       setloading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
        );
        setMovieList((prev)=>[...prev,...res.data.results]);
        console.log("TMDb Response:", res.data.results);
        setloading(false);
      } catch (error) {
        setError("Failed to fetch movies");
        console.error(error);
        setloading(false);
      }
    }

  useEffect(() => {
  if (!isSearching && !searchItem.trim()) {
    fetchMovies(page);
  }
       // eslint-disable-next-line
  }, [page])
  

  useEffect(() => {
    if(isSearching) return;
    const observer=new IntersectionObserver(
        (entries)=>{
            if(entries[0].isIntersecting && !loading){
                setpage((prevPage)=>prevPage+1)
            }
        },
        {threshold:1}
    );
    if(bottomRef.current){
        observer.observe(bottomRef.current);
    }
    return()=>{
        if (bottomRef.current) observer.unobserve(bottomRef.current);
    }
        // eslint-disable-next-line
  }, [loading])
  


  return (
    <div className="container p-2">
      {error && <p>{error}</p>}

      <div className="row">
        {movieList.map((movie) => (
          <div key={movie.id} className="col-md-3 col-sm-6 mb-4 text-center">
            <img
            onClick={()=>setselectedMovieID(movie.id)}
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '150px', borderRadius: '10px' }}
            />
            <p className="mt-2" style={{ fontSize: '14px' }}>{movie.title}</p>
          </div>
        ))}
      </div>
      {!isSearching && <div ref={bottomRef} style={{ height: '50px' }}></div>}
  
      {
        loading && <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
      }
      {
        selectedMovieID && (<MovieModal movieId={selectedMovieID}   onClose={()=>setselectedMovieID(null)}></MovieModal>)
      }
    </div>
  );
}

export default MovieList;
