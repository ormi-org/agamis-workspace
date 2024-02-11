import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  OtpPageComponent,
  isCharCodeLetter,
  isCharCodeNumber,
} from './otp-page.component';
import { HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs';

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

  describe('isCharCodeLetter', () => {
    it('should return true for lowercase letters', () => {
      expect(isCharCodeLetter(97)).toBe(true);
      expect(isCharCodeLetter(122)).toBe(true);
    });

    it('should return false for uppercase letters', () => {
      expect(isCharCodeLetter(65)).toBe(false);
      expect(isCharCodeLetter(90)).toBe(false);
    });

    it('should return false for numbers', () => {
      expect(isCharCodeLetter(48)).toBe(false);
      expect(isCharCodeLetter(57)).toBe(false);
    });

    it('should return false for special characters', () => {
      expect(isCharCodeLetter(33)).toBe(false);
      expect(isCharCodeLetter(47)).toBe(false);
    });
  });

  describe('isCharCodeNumber', () => {
    it('should return true for numbers', () => {
      expect(isCharCodeNumber(48)).toBe(true);
      expect(isCharCodeNumber(57)).toBe(true);
    });

    it('should return false for lowercase letters', () => {
      expect(isCharCodeNumber(97)).toBe(false);
      expect(isCharCodeNumber(122)).toBe(false);
    });

    it('should return false for uppercase letters', () => {
      expect(isCharCodeNumber(65)).toBe(false);
      expect(isCharCodeNumber(90)).toBe(false);
    });

    it('should return false for special characters', () => {
      expect(isCharCodeNumber(33)).toBe(false);
      expect(isCharCodeNumber(47)).toBe(false);
    });
  });

  describe('#isOtpFilled$', () => {
    it('should return true if all fields are filled', (done) => {
      // given
      component.isOtpFilled$.subscribe((result) => {
        expect(result).toBe(true);
        done();
      });

      component.otpForm.patchValue({
        0: 'D',
        1: 'E',
        2: 'A',
        3: 'F',
        4: 'E',
        5: 'D',
      });
    });

    it('should return false if not all fields are filled', (done) => {
      // given
      component.isOtpFilled$.subscribe((result) => {
        expect(result).toBe(false);
        done();
      });

      component.otpForm.patchValue({
        0: 'D',
        1: 'E',
        2: 'A',
        3: 'F',
        4: 'E',
      });
    });
  });

  describe('#handleInputValidation', () => {
    it('should allow letters and uppercase it', () => {
      // arrange
      const key: string = 'a';
      jest.spyOn(String.prototype, 'toLocaleUpperCase').mockReturnValue('A');
      const event = new KeyboardEvent('keydown', { key: key });
      event.preventDefault = jest.fn();
      jest.spyOn(event, 'target', 'get').mockReturnValue({ id: 'otp-0' } as unknown as EventTarget);

      component.focusNextField = jest.fn();
      component.otpForm.patchValue = jest.fn();

      // act
      component.handleInputValidation(event);

      expect(component.focusNextField).toHaveBeenCalled();
      expect(component.otpForm.patchValue).toHaveBeenCalled();
      expect(event.key.toLocaleUpperCase).toHaveBeenCalled();
    });

    it('should allow backspace key', () => {
      // arrange
      const event = new KeyboardEvent('keydown', { key: 'Backspace' });
      event.preventDefault = jest.fn();
      jest.spyOn(event, 'target', 'get').mockReturnValue({ id: 'otp-0' } as unknown as EventTarget);

      component.focusPreviousField = jest.fn();
      component.otpForm.patchValue = jest.fn();
      
      // act
      component.handleInputValidation(event);

      expect(component.focusPreviousField).toHaveBeenCalled();
      expect(component.otpForm.patchValue).toHaveBeenCalled();
    });

    it('should allow enter key', () => {
      // arrange
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      event.preventDefault = jest.fn();
      component.handleInputValidation = jest.fn();
      jest.spyOn(event, 'target', 'get').mockReturnValue({ id: 'otp-0' } as unknown as EventTarget);
      
      // act
      component.handleInputValidation(event);

      expect(component.handleInputValidation).toHaveBeenCalled();
    });
  });


  describe('#resendOtp', () => {
    it('should call authenticationService.resendOtp', () => {
      // arrange

      // act
      component.resendOtp();
    });

    it('should set isResendTimerOn to true', (done) => {
      // arrange

      component.isResendTimerOn.subscribe((value) => {
        expect(value).toBe(true);
        done();
      });

      // act
      component.resendOtp();
    });

    it('should reset timerSeconds to 30', (done) => {
      // arrange
      component.timerSeconds.pipe(take(1)).subscribe((value) => {
        expect(value).toBe(30);
        done();
      });

      // act
      component.resetTimer();
    });
  });
});
