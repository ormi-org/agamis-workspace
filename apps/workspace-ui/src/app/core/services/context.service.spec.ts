import { TestBed } from '@angular/core/testing';

import { ContextService } from './context.service';
import { HttpClientModule } from '@angular/common/http';

describe('ContextService', () => {
  let service: ContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
