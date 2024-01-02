import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgIconeAccountComponent } from './svg-icone-account.component';

describe('SvgIconeAccountComponent', () => {
  let component: SvgIconeAccountComponent;
  let fixture: ComponentFixture<SvgIconeAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvgIconeAccountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SvgIconeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
