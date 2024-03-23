import { Pipe, PipeTransform } from '@angular/core';
import { Movies } from '../models/movies';

@Pipe({
  name: 'movieFilters',
  standalone: true,
})
export class MovieFiltersPipe implements PipeTransform {
  transform(
    moviesList: Movies[],
    movieTitle: string,
    movieReleaseDate: string
  ): Movies[] {
    if (movieTitle && !movieReleaseDate) {
      return moviesList.filter((movie: Movies) =>
        movie.title.toLowerCase().includes(movieTitle.toLocaleLowerCase())
      );
    } else if (movieReleaseDate && !movieTitle) {
      return moviesList.filter((movie: Movies) =>
        movie.release_date
          .split('-')[0]
          .toLowerCase()
          .includes(`${movieReleaseDate}`.toLocaleLowerCase())
      );
    } else if (movieTitle && movieReleaseDate) {
      return moviesList
        .filter((movie: Movies) =>
          movie.title.toLowerCase().includes(movieTitle.toLocaleLowerCase())
        )
        .filter((movie: Movies) =>
          movie.release_date
            .split('-')[0]
            .toLowerCase()
            .includes(`${movieReleaseDate}`.toLocaleLowerCase())
        );
    } else {
      return moviesList;
    }
  }
}
