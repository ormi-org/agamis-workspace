import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgImageSearchComponent } from '../../../shared/svg/svg-image-search.component';

describe('SvgImageSearchComponent', () => {
  let component: SvgImageSearchComponent;
  let fixture: ComponentFixture<SvgImageSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvgImageSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SvgImageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
