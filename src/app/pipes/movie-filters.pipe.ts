import { Pipe, PipeTransform } from '@angular/core';
import { MovieFilters, Movies } from '../models/movies';

@Pipe({
  name: 'movieFiletrs',
  standalone: true,
  pure: false,
})
export class MovieFiltersPipe implements PipeTransform {
  transform(moviesList: Movies[], moviFilters: MovieFilters) {
    if (!moviesList.length) {
      return;
    }
    const { release_date, title } = moviFilters;
    if (title && !release_date) {
      return moviesList.filter((movie: Movies) =>
        movie.title.toLowerCase().includes(title.toLocaleLowerCase())
      );
    } else if (release_date && !title) {
      return moviesList.filter((movie: Movies) =>
        movie.release_date
          .toLowerCase()
          .includes(`${release_date}`.toLocaleLowerCase())
      );
    } else if (title && release_date) {
      return moviesList
        .filter((movie: Movies) =>
          movie.title.toLowerCase().includes(title.toLocaleLowerCase())
        )
        .filter((movie: Movies) =>
          movie.release_date
            .toLowerCase()
            .includes(`${release_date}`.toLocaleLowerCase())
        );
    } else {
      return moviesList;
    }
  }
}
