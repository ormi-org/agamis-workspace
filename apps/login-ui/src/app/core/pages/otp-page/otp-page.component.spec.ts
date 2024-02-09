import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtpPageComponent } from './otp-page.component';
import { HttpClientModule } from '@angular/common/http';

describe('OtpPageComponent', () => {
  let component: OtpPageComponent;
  let fixture: ComponentFixture<OtpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpPageComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OtpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
