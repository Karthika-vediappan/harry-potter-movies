import { MovieFiltersPipe } from './movie-filters.pipe';

describe('MovieFiltersPipe', () => {
  it('create an instance', () => {
    const pipe = new MovieFiltersPipe();
    expect(pipe).toBeTruthy();
  });
});
