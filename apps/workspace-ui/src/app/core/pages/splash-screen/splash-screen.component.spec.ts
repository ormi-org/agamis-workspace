import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashScreenComponent } from './splash-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('SplashScreenComponent', () => {
  let component: SplashScreenComponent;
  let fixture: ComponentFixture<SplashScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplashScreenComponent, HttpClientModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SplashScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
