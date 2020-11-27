import React, { useEffect, useState } from 'react'
import Movie from './Movie'
import './style.css'
import { CircularProgress } from '@material-ui/core'
import { AnyAaaaRecord } from 'dns'

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

    // const [movies,setMovies] = useState([])

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
           //props.setMovies(movies)
           //props.setTempMovies(movies)
           //props.setMovies(movies.map((movie: any) => movie.Search))

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

    //console.log("MOVIES:", movies)

    if (props.movies.length === 0) {
        console.log("Loader")
        return ( 
                <div className="loader">
                    <CircularProgress/>
                </div>
        )
    }

    // return <div className="movies">
    //         { props.movies.flat(2).map((movie:any) => 
    //             <Movie
    //             key={movie.imdbID}
    //             title={movie.Title}
    //             year={movie.Year}
    //             image={movie.Poster}/> )}
    //     </div>

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