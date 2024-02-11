import { TestBed } from '@angular/core/testing';

import { OrganizationService } from './organization.service';
import { HttpClientModule } from '@angular/common/http';

describe('OrganizationService', () => {
  let service: OrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(OrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
