import React ,{useState,useEffect }from 'react'
import { getFavourites,removeFromFavourites } from './FavouriteDb';
import MovieModal from './MovieModal';


function Favourites() {
    const [favourites, setfavourites] = useState([]);
    const [selectedMovie, setselectedMovie] = useState(null);

    useEffect(() => {
        loadFavourites();
    }, []);

    const loadFavourites=async ()=>{
        const favs=await getFavourites();
        setfavourites(favs);
    };

    const handleremove=async (id)=>{
        await removeFromFavourites(id);
        loadFavourites();
    };


    

  return (
    <div className="container p-3">
        <h2>
            My Favourites
        </h2>
        <div className="row">
            {favourites.length===0?(<p>Nothing to show...</p>):(
                favourites.map((movie)=>(
                    <div className='col-md-3 col-sm-6 mb-4 text-center' key={movie.id}>
                        <img 
                        onClick={()=>setselectedMovie(movie.id)}
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '150px', borderRadius: '10px' }} />
                <p className='mt-2'>{movie.title}</p>
                <button className='btn btn-sm btn-danger' onClick={()=>handleremove(movie.id)}>Remove</button>
                        </div>
                ))
            )}
        </div>
        {selectedMovie && <MovieModal movieId={selectedMovie}  onRemove={loadFavourites} onClose={()=>setselectedMovie(null)}></MovieModal>}
    </div>
  )
}

export default Favourites