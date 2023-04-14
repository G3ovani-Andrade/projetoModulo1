import { TestBed } from '@angular/core/testing';

import { StoragePacienteService } from './storage-paciente.service';

describe('StoragePacienteService', () => {
  let service: StoragePacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoragePacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
