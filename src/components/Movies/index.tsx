import React, { useEffect, useState } from 'react'
import Movie from './Movie'
import './style.css'
import { CircularProgress } from '@material-ui/core'

const API_KEY = "eb7f19c3"  // codecamps - my key  383e0fe3

const series = [ 'the triangle', 'avengers', 'inception', 'interstellar', 'harry potter', 'lord of the rings', 'the expanse' ]

const Movies: React.FC = props => {

    const [movies,setMovies] = useState([])

    useEffect(() => {
        const promises = series.map(series=>{return fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(series)}&apikey=${API_KEY}&page=1`).then(
            r=>{
                let answer=r.json()
                //console.log("here:",answer);
                return answer;
            }
        )
        })

        Promise.all(promises).then((movies: any) => {
           setMovies(movies)
           //setMovies(movies.map((movie: any) => movie.Search))
         } )
    }, [])

    //console.log("MOVIES:", movies)

    if (movies.length === 0) {
        console.log("Loader")
        return ( 
                <div className="loader">
                    <CircularProgress/>
                </div>
        )
    }

    return <div className="movies">
            { movies.flat(2).map((movie:any) => 
                <Movie
                key={movie.imdbID}
                title={movie.Title}
                year={movie.Year}
                image={movie.Poster}/> )}
        </div>

}

export default Movies