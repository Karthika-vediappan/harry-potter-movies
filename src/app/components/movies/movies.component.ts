import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Movies } from '../../models/movies';
import { FormsModule } from '@angular/forms';
import { MovieFiltersPipe } from '../../pipes/movie-filters.pipe';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MovieFiltersPipe,
  ],
  providers: [MoviesService],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit, OnDestroy {
  moviesList: Movies[] = [];
  movieTitle: string = '';
  movieReleaseDate: string = '';
  subscriptions$: Subscription = new Subscription();
  constructor(
    private readonly moviesService: MoviesService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.subscriptions$.add(
      this.moviesService
        .getMovies()
        .pipe(
          tap((moviesList: Movies[]) => {
            this.moviesList = moviesList;
          })
        )
        .subscribe()
    );
  }

  goToMovieDetails(id: string): void {
    this.router.navigate(['/movies', id]);
  }

  getHoursAndMinutes(count: string): string {
    return this.moviesService.getHoursAndMinutes(Number(count));
  }

  numberOnly(event: KeyboardEvent): boolean {
    const charCode = event.key;
    if (charCode < '0' || charCode > '9') {
      return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
