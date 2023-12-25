import { Injectable } from '@angular/core';
import Context from './models/context';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  private context: Subject<Context> = new ReplaySubject<Context>();

  setContext(passedCtx: Context): void {
    if (!passedCtx.orgId || !passedCtx.orgName) {
      throw new Error("Can't create context without orgId and orgName");
    }
    this.context.next(passedCtx);
  }

  getContext(): Observable<Context> {
    return this.context.asObservable();
  }
}
