import React from 'react'
import './App.css'
// import { Button } from '@material-ui/core'
import Header from './components/Header'
import Movies from './components/Movies'

function App() {
  return (
    <div className="App">
      <Header/>
      <Movies/>
    </div>
  );
}

//      <Button variant="contained" color="primary">Hello World</Button>

export default App;


