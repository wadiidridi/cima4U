import { TestBed } from '@angular/core/testing';

import { FavoriteMovieService } from './favoritemovie.service';

describe('FavoritemovieService', () => {
  let service: FavoriteMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
