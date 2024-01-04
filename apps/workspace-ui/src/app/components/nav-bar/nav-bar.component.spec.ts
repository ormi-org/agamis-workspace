import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { AppModule } from '../../app.module'; 
import { UserInfoService } from '../../services/user-info-service';
import { of } from 'rxjs';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

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
      })
    };
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [NavBarComponent],
      providers: [
        { provide: UserInfoService, useValue: userInfoServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
});
