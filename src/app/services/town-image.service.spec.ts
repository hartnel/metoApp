import { TestBed } from '@angular/core/testing';

import { TownImageService } from './town-image.service';

describe('TownImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TownImageService = TestBed.get(TownImageService);
    expect(service).toBeTruthy();
  });
});
