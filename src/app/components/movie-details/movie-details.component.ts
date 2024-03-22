import { NgFor, NgIf, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { MovieDetails } from '../../models/movie-details';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, RouterModule, HttpClientModule],
  providers: [MoviesService],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieDetails!: MovieDetails;
  subscriptions$: Subscription = new Subscription();
  constructor(
    private readonly moviesService: MoviesService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMovieDetails();
  }

  getMovieDetails(): void {
    const id = this.activatedRoute.snapshot.params['movieId'];
    this.subscriptions$.add(
      this.moviesService
        .getMovieDetails(id)
        .pipe(
          tap((movieDetails: MovieDetails) => {
            this.movieDetails = movieDetails;
          })
        )
        .subscribe()
    );
  }

  goToMovies(): void {
    this.router.navigate(['/movies']);
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
