import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginPageComponent } from './login-page.component';
import { ContextService } from '../../services/context.service';
import { Context, ViewType } from '@agamis/workspace/shared/login/types';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set an error message when ids for local auth are not entered', () => {
    const authenticationService = TestBed.inject(AuthenticationService);
    jest.spyOn(authenticationService, 'localAuthenticate');
    component.handleLocalLogin();
    expect(component.errorMessage).toBe('Please provide your credentials');
  });

  it('should call localAuthenticate when handleLocalLogin is called', () => {
    const authenticationService = TestBed.inject(AuthenticationService);
    const contextService = TestBed.inject(ContextService);
    jest.spyOn(authenticationService, 'localAuthenticate');
    jest.spyOn(contextService, 'getContext').mockImplementation(() => of(<Context>{view: <ViewType>'login', orgId: '7a49fc73-d38b-478a-b8bf-8c9521973157'}));
    component.loginForm.setControl('identifier', new FormControl('test'));
    component.loginForm.setControl('password', new FormControl('test'));
    component.handleLocalLogin();
    expect(authenticationService.localAuthenticate).toHaveBeenCalled();
  });

  it('should set loading to true when handleLocalLogin is called', () => {
    component.loginForm.setControl('identifier', new FormControl('test'));
    component.loginForm.setControl('password', new FormControl('test'));
    component.handleLocalLogin();
    expect(component.loading).toBeTruthy();
  });

  it('should set an error message when local authentication fails', () => {
    const authenticationService = TestBed.inject(AuthenticationService);
    const contextService = TestBed.inject(ContextService);
    jest.spyOn(authenticationService, 'localAuthenticate').mockReturnValue(throwError(() => { return { message: 'error' }}));
    jest.spyOn(contextService, 'getContext').mockImplementation(() => of(<Context>{view: <ViewType>'login', orgId: '7a49fc73-d38b-478a-b8bf-8c9521973157'}));
    component.loginForm.setControl('identifier', new FormControl('test'));
    component.loginForm.setControl('password', new FormControl('test'));
    component.handleLocalLogin();
    expect(component.errorMessage).toEqual('error');
  });

  it('should not set an error message when local authentication succeeds', () => {
    const authenticationService = TestBed.inject(AuthenticationService);
    jest.spyOn(authenticationService, 'localAuthenticate').mockReturnValue(of(void 0));
    component.loginForm.setControl('identifier', new FormControl('test'));
    component.loginForm.setControl('password', new FormControl('test'));
    component.handleLocalLogin();
    expect(component.errorMessage).toBeUndefined();
  });
});
