import { TestBed } from '@angular/core/testing';

import { ServeiUsuarisService } from './servei-usuaris.service';

describe('ServeiUsuarisService', () => {
  let service: ServeiUsuarisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServeiUsuarisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
