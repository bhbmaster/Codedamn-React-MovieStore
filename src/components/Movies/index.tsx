import React, { useEffect, useState } from 'react'
import Movie from './Movie'
import './style.css'

const API_KEY = "eb7f19c3"  // codecamps - my key  383e0fe3

//const series = [ 'the triangle', 'avengers', 'inseption', 'interstellar' ]
const series = [ 'the triangle', 'avengers', 'inception', 'interstellar', 'harry potter', 'lord of the rings', 'the expanse' ]

//const series = [ 'avengers', 'interstellar' ]

const Movies: React.FC = props => {

    const [movies,setMovies] = useState([])

    useEffect(() => {
        //console.log("Effect")
        const promises = series.map(series=>{return fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(series)}&apikey=${API_KEY}&page=1`).then(
            r=>{
                let answer=r.json()
                console.log("here:",answer);
                return answer;
            }
        )
        })

        //console.log("promises array:", promises)
        //Promise.all(promises).then(r=>console.log("PA-Success",r)).catch(r=>console.log("PA-fail",r))
        Promise.all(promises).then((movies: any) => {
            //setMovies(movies.map((m: any) => m.Search))
            //let filteredmovies = movies.filter((s: any)=>s.imdbID!==undefined)
            //console.log("FILTERED:",filteredmovies)
            setMovies(movies)
            //setMovies(filteredmovies)
            

         } )
    }, [])
    

    // useEffect(() => {
    //     series.forEach(s=>{
    //         return fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(s)}&apikey=${API_KEY}`).then(r=>r.json()).then(r=>console.log(r))
    //     })
    // }, [])

    // useEffect(() => {
    //     //console.log("Fetching1")
    //     fetch(`http://www.omdbapi.com/?t=C&y=2019&apikey=${API_KEY}`).then(r=>r.json()).then(r=>console.log("Le Response:",r))
    //     // fetch(`http://www.omdbapi.com/?t=C&y=2019&apikey=${API_KEY}`).then(r=>{ var ans=r.json(); console.log("Our Res", ans); return ans})
    // }, [])

    // return (
    //     <div>
    //         test
    //     </div>
    // )

    // return <div className="movies">
    //         { movies.flat(2).map((movie:any) => {
    //             <Movie key={movie.imdbID}
    //             title={movie.title}
    //             year={movie.Year}
    //         image={movie.Poster} /> })}
    //     </div>

    console.log("MOVIES:", movies)
    // movies.forEach(m=>console.log("important stuff:", m.imdbID, m.Title, m.Year, m.Poster))

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