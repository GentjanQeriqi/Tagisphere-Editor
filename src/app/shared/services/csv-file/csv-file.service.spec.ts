import { TestBed } from '@angular/core/testing';

import { CsvFileService } from './csv-file.service';

describe('CsvFileService', () => {
  let service: CsvFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
