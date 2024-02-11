import { TestBed } from '@angular/core/testing';

import { ContextService } from './context.service';
import { Context } from '@agamis/workspace/shared/login/types';

describe('ContextService', () => {
  let service: ContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#setContext', () => {
    it('should throw an error if orgId and orgName are not provided', () => {
      // given
      const passedCtx: Context = {
        view: 'login',
      };

      // when
      expect(() => {
        service.setContext(passedCtx);
      }).toThrow();
    });
  })

  describe('#dispatchLoginDone', () => {
    it('should dispatch a login done action', done => {
      // given
      const ctx: Context = {
        orgId: '4f02da7a-d3a3-4384-8ee4-5b1cc49467ce',
        orgName: 'Agamis',
        view: 'login',
      };
      service.setContext(ctx);

      service.whenLoginDone().subscribe(() => {
        done();
      });

      // when
      service.dispatchLoginDone();
    }, 100)
  })
});
