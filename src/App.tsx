import React, { useState } from 'react'
import './App.css'
// import { Button } from '@material-ui/core'
import Header from './components/Header'
import Movies from './components/Movies'

function App() {

  const [movies,setMovies] = useState([])
  const [tempMovies,setTempMovies] = useState([])

  return (
    <div className="App">
      <Header movies={movies} setMovies={setTempMovies}/>
      <Movies movies={tempMovies} setMovies={setMovies} setTempMovies={setTempMovies}/>
    </div>
  );
}

//      <Button variant="contained" color="primary">Hello World</Button>

export default App;


