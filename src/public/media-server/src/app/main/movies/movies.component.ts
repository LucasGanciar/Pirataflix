import { Component, OnInit } from '@angular/core';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[]
  constructor(private movieService: MovieService) { }

  async ngOnInit(): Promise<void> {
    this.movies = await this.movieService.getMovies()
  }

}
