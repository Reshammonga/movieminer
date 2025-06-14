import React ,{useState,useEffect }from 'react'
import { getFavourites,removeFromFavourites } from './FavouriteDb';
import MovieModal from './MovieModal';


function Favourites({searchItem}) {
    const [favourites, setfavourites] = useState([]);
    const [selectedMovie, setselectedMovie] = useState(null);
    const [favsearch, setfavsearch] = useState([]);

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

useEffect(() => {
 if(searchItem.trim()){
    const filterfav=favourites.filter(movie=>
        movie.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    setfavsearch(filterfav);
 }else{
    setfavsearch(favourites);
 }
}, [searchItem,favourites]);

    

  return (
    <div className="container p-3">
   
        <div className="row">
            {favsearch.length===0?(<div className="text-center mt-5">
 <h5>{searchItem? `No results for "${searchItem}"`:`No Favourites yet`}</h5>
 <p>{searchItem?`Try Different Movie`:'Start Adding your Favs'}</p>
</div>):(<>
         <h2>
            My Favourites
        </h2>
               { favsearch.map((movie)=>(
                    <div className='col-md-3 col-sm-6 mb-4 text-center' key={movie.id}>
                        <img 
                        onClick={()=>setselectedMovie(movie.id)}
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '250px', borderRadius: '5px' }} />
                <p className='mt-2'>{movie.title}</p>
                <button className='btn btn-sm btn-danger' onClick={()=>handleremove(movie.id)}>Remove</button>
                        </div>
                ))}
             </>
            )}
        </div>
        {selectedMovie && <MovieModal movieId={selectedMovie}  onRemove={loadFavourites} onClose={()=>setselectedMovie(null)}></MovieModal>}
    </div>
 
  )
}

export default Favourites