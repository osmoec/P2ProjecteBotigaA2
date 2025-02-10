import { TestBed } from '@angular/core/testing';

import { ListaVehiculosService } from './lista-vehiculos.service';

describe('ListaVehiculosService', () => {
  let service: ListaVehiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaVehiculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
