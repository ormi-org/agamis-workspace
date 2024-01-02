import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgIconeSessionsComponent } from '../../../shared/svg/svg-icone-sessions.component';

describe('SvgIconeSessionsComponent', () => {
  let component: SvgIconeSessionsComponent;
  let fixture: ComponentFixture<SvgIconeSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvgIconeSessionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SvgIconeSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
