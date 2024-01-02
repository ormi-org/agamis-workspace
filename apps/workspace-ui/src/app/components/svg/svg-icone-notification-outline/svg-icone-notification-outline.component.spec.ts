import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgIconeNotificationOutlineComponent } from '../../../shared/svg/svg-icone-notification-outline.component';

describe('SvgIconeNotificationOutlineComponent', () => {
  let component: SvgIconeNotificationOutlineComponent;
  let fixture: ComponentFixture<SvgIconeNotificationOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvgIconeNotificationOutlineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SvgIconeNotificationOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
