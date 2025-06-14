
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MovieList from './Component/MovieList';
import Navbar from './Component/Navbar';
import Favourites from './Component/Favourites';
import { useState } from 'react';

function App() {
 const [searchItem, setsearchItem] = useState("");
  return (
    <div className="App">
      <h1>Movie-Miner</h1>
       <Navbar setsearchItem={setsearchItem}></Navbar>
<Routes>
  <Route exact path="/" element={<MovieList searchItem={searchItem}></MovieList>}></Route>
    <Route exact  path="/favs" element={<Favourites searchItem={searchItem} ></Favourites>}></Route>
</Routes>
     

    </div>
  );
}

export default App;
