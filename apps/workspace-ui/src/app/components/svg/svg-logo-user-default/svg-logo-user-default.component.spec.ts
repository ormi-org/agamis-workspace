import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgLogoUserDefaultComponent } from '../../../shared/svg/svg-logo-user-default.component';

describe('SvgLogoUserDefaultComponent', () => {
  let component: SvgLogoUserDefaultComponent;
  let fixture: ComponentFixture<SvgLogoUserDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvgLogoUserDefaultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SvgLogoUserDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
