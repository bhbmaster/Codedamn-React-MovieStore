import React, { useEffect, useState } from 'react'
import Movie from './Movie'
import './style.css'
import { CircularProgress } from '@material-ui/core'

type Props = {
    movies: any
    setMovies: any
    setTempMovies: any
}

type Movie = {
    imdbID: string
    title: string
    image: string
    year: string
  }
  

const API_KEY = "eb7f19c3"  // codecamps - my key  383e0fe3

const series = [  'star wars', 'goodfellas', 'scream', 'king kong', 'shawshank redemption', 'jaws','brick','princess mononoke', 'dragon ball', 'the fountain', 'back to the future', 'crouching tiger, hidden dragon', 'superman', 'the expanse', 'saw', 'lord of the rings', 'harry potter', "interstellar", "avengers", "the triangle"]

const Movies: React.FC<Props> = props => {

    useEffect(() => {
        const promises = series.map(series=>{return fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(series)}&apikey=${API_KEY}&page=1`).then(
            r=>{
                let answer=r.json()
                //console.log("here:",answer);
                return answer;
            }
        )
        })

        Promise.all(promises).then((movies: any) => {

            const updateMovies: Movie[] = movies.map((movie: any) => movie.Search).flat(2).map(
                (movie: any) => ({
                    title: movie.Title,
                    year: movie.Year,
                    image: movie.Poster,
                    imdb: movie.imdbID
                }))

            props.setMovies(updateMovies)
            props.setTempMovies(updateMovies)

         } )
    }, [])

    if (props.movies.length === 0) {
        return ( 
                <div className="loader">
                    <CircularProgress/>
                </div>
        )
    }

    return <div className="movies">
        {props.movies.map((movie: Movie) => {
            return <Movie
                key={movie.imdbID}
                title={movie.title}
                year={movie.year}
                image={movie.image}
            />
        })}
    </div>

}

export default Movies