import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetails } from '../models/movie-details';
import { Movies } from '../models/movies';

@Injectable()
export class MoviesService {
  constructor(private readonly http: HttpClient) {}

  getMovies(): Observable<Movies[]> {
    return this.http.get<Movies[]>('/movies');
  }

  getMovieDetails(id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`/movies/${id}`);
  }
}
