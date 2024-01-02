import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgLogoAgamisComponent } from '../../../shared/svg/svg-logo-agamis.component';

describe('SvgLogoAgamisComponent', () => {
  let component: SvgLogoAgamisComponent;
  let fixture: ComponentFixture<SvgLogoAgamisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvgLogoAgamisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SvgLogoAgamisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
