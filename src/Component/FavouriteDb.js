import { get,set } from "idb-keyval";
const FavKey='favourites';
export async function getFavourites(){
    return (await get(FavKey)) || [];
}
export async function addToFavourite(movie){
    const currentFavs=(await get(FavKey)) || [];
    const updatedFavs=[...currentFavs,movie];
    await set(FavKey,updatedFavs);
}

export async function removeFromFavourites(movieID) {
    const currentFavs=(await get(FavKey)) || [];
    const updatedFavs=currentFavs.filter(m=>m.id !==movieID);
    await set(FavKey,updatedFavs);
}

export async function isFavourite(movieID) {
    const currentFavs=(await get(FavKey)) || [];
    return currentFavs.some(m=>m.id===movieID);
    
}