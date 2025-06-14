import React, { useState ,useEffect } from 'react'
import axios from 'axios';
import ReactDOM from 'react-dom';
import { addToFavourite,removeFromFavourites,isFavourite } from './FavouriteDb';


function MovieModal({movieId,onClose,onRemove}) {
    const [isFav, setisFav] = useState(false)
    const [movieData, setmovieData] = useState(null);
    const [trailerKey, settrailerKey] = useState(null);
    const apiKey=process.env.REACT_APP_API_KEY;

    useEffect(() => {
     const checkFav=async()=>{
      const fav=await isFavourite(movieId);
      setisFav(fav);
     };
     checkFav();
    }, [movieId]);

    const handleToggleFav=async ()=>{
      if(isFav){
        await removeFromFavourites(movieId);
        setisFav(false);
        if (onRemove) onRemove(movieId);
        onClose();

      }else{
        await addToFavourite(movieData);
        setisFav(true);
      }
    }
    
    useEffect(() => {
     const fetchmovieDetails=async()=>{
        const res =await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
        setmovieData(res.data);
     }
     const fetchTralier=async ()=>{
        const res =await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
        const trailer=res.data.results.find(
            (video)=>video.type==="Trailer" && video.site==="YouTube"
        );
        if(trailer) settrailerKey(trailer.key);
     };
     fetchTralier();
     fetchmovieDetails();
 
    }, [movieId,apiKey]);
    
    if(!movieData) return null;
  return ReactDOM.createPortal(
    <div style={modalStyle}>
        <div style={modalContent}>
          <div>
            <button type="button" style={closebtn} onClick={onClose} class="btn-close" aria-label="Close"></button>
            <button onClick={handleToggleFav} className="btn btn-dark" style={addtofavBtn}>{isFav ? <i class="fa-regular fa-star"></i>:'⭐'}</button>
            </div>
            <div>
            <h2>{movieData.title}</h2>
            <p><strong>Rating :</strong>{movieData.vote_average}</p>
            <p>{movieData.overview}</p>
            {
                trailerKey && (
                    <iframe width="100%" height="500px"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title='Trailer'
                    allowFullScreen></iframe>
                )
            }
        </div>
        </div>
    </div>,
      document.body
  )

}
const modalStyle={
    position:'fixed',
    top : 0,left:0,right:0,bottom:0,
    backgroundColor:'rgba(0,0,0,0.7)',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    zIndex:1000
};
const modalContent={
    backgroundColor: 'white',
  padding: '20px',
  width: '90%',
  maxWidth: '500px',
  maxHeight: '90vh',
  overflow: 'auto',
  borderRadius: '10px',
  position:'relative'
};

const closebtn={
  
  fontSize: '18px',
  cursor: 'pointer',
  position :'absolute',
  right:'0',
  top:'10px'
};
 const addtofavBtn={
   cursor: 'pointer',
  position: 'absolute',
  right: '50px',
  top: '10px',
  border: 'none',
  fontSize: '18px',
 }
 const iframeStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 'none',
};

export default MovieModal