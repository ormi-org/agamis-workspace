import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgLogoEntrepriseComponent } from './svg-logo-entreprise.component';

describe('SvgLogoEntrepriseComponent', () => {
  let component: SvgLogoEntrepriseComponent;
  let fixture: ComponentFixture<SvgLogoEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvgLogoEntrepriseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SvgLogoEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
