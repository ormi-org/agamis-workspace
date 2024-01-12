import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountSettingTabComponent } from './account-setting-tab.component';

describe('AccountSettingTabComponent', () => {
  let component: AccountSettingTabComponent;
  let fixture: ComponentFixture<AccountSettingTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSettingTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSettingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
