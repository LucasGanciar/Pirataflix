import { Injectable } from '@angular/core';
import { Movie } from './movie.model';

@Injectable()
export class MovieService {
    private movies: Movie[]

    async getMovies(){
        const response = await fetch('http://localhost:8000/api/movies')
        this.movies = await response.json() as Movie[]
        console.log(this.movies)
        return this.movies
    }
}