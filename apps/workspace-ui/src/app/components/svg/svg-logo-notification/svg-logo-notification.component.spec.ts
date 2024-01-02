import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgLogoNotificationComponent } from './svg-logo-notification.component';

describe('SvgLogoNotificationComponent', () => {
  let component: SvgLogoNotificationComponent;
  let fixture: ComponentFixture<SvgLogoNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvgLogoNotificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SvgLogoNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
