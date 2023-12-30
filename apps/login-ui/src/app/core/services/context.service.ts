import { Injectable } from '@angular/core';
import { Context } from '@agamis/workspace/shared/login/types';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  private readonly context: Subject<Context> = new ReplaySubject<Context>();
  private readonly loginDone: Subject<void> = new Subject<void>();

  setContext(passedCtx: Context): void {
    if (!passedCtx.orgId || !passedCtx.orgName) {
      throw new Error("Can't create context without orgId and orgName");
    }
    this.context.next(passedCtx);
  }

  getContext(): Observable<Context> {
    return this.context.asObservable();
  }

  dispatchLoginDone(): void {
    console.debug("-- ContextService#dispatchLoginDone() > dispatching login done action");
    this.loginDone.next();
  }

  whenLoginDone(): Observable<void> {
    return this.loginDone.asObservable();
  }
}
