import { TestBed } from '@angular/core/testing';

import { ServicioPrincipalService } from './servicio-principal.service';

describe('ServicioPrincipalService', () => {
  let service: ServicioPrincipalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioPrincipalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
