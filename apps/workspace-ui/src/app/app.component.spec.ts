import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from './app.module'; 
import { UserInfoService } from './services/user-info-service';
import { of } from 'rxjs';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    const userInfoServiceMock = {
      userInfos$: of({
        identifier:'Chauncey',
        orgName:"Tyria's heroes",
        email:'chauncey.vonsnuffles@divinitysreach.tyria',
        projectsNbr:'8', 
        avatarSrc:'',
        timeZone:'America/New_York',
        Language:'en',
        Fullname:'@chauncey.vonsnuffles',
        JobTitle:'Developers'
      }),
      fetchData: () => Promise.resolve()
    };
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppModule],
      declarations: [AppComponent],
      providers: [
        { provide: UserInfoService, useValue: userInfoServiceMock }
      ]
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
  });

  it(`should have as title 'workspace-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('workspace-ui');
  });
});
