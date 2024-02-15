import { Context } from '@agamis/workspace/shared/login/types';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { of, take, takeLast, throwError } from 'rxjs';
import { LocalAuthentResponse } from '../../services/authentication.service';
import {
  OtpPageComponent,
  isCharCodeLetter,
  isCharCodeNumber,
} from './otp-page.component';

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

  describe('#isCharCodeLetter', () => {
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
    it('should prevent default action on event', () => {
      const event = { preventDefault: jest.fn(), key: '1', target: { id: 'otp-0' } } as unknown as KeyboardEvent; 
      component.handleInputValidation(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  
    it('should submit form on Enter key', () => {
      const event = { preventDefault: jest.fn(), key: 'Enter', target: { id: 'otp-0' } } as unknown as KeyboardEvent;
      const submitSpy = jest.spyOn(component, 'handleValidateOtp');
      component.handleInputValidation(event);
      expect(submitSpy).toHaveBeenCalled();
    });
  
    it('should erase previous field on Backspace key', () => {
      const event1 = { preventDefault: jest.fn(), key: '1', target: { id: 'otp-0' } } as unknown as KeyboardEvent;
      component.handleInputValidation(event1);
      const event2 = { preventDefault: jest.fn(), key: '2', target: { id: 'otp-1' } } as unknown as KeyboardEvent;
      component.handleInputValidation(event2);
      const eventB1 = { preventDefault: jest.fn(), key: 'Backspace', target: { id: 'otp-2' } } as unknown as KeyboardEvent;
      component.handleInputValidation(eventB1);
      const eventB2 = { preventDefault: jest.fn(), key: 'Backspace', target: { id: 'otp-1' } } as unknown as KeyboardEvent;
      component.handleInputValidation(eventB2);
      expect([component.otpForm.value[0], component.otpForm.value[1]]).toEqual(['1', '']);
    });
  
    it('should set field to uppercase letter on key press', () => {
      const event = { preventDefault: jest.fn(), key: 'a', target: { id: 'otp-0' } } as unknown as KeyboardEvent;
      component.handleInputValidation(event);
      expect(component.otpForm.value['0']).toBe('A');
    });
  
    it('should focus next field after letter key press', () => {
      const event = { preventDefault: jest.fn(), key: 'a', target: { id: 'otp-0' } } as unknown as KeyboardEvent;
      const spy = jest.spyOn(component, 'focusNextField');
      component.handleInputValidation(event);
      expect(spy).toHaveBeenCalledWith('0');
    });
  
    it('should set field to number on key press', () => {
      const event = { preventDefault: jest.fn(), key: '1', target: { id: 'otp-0' } } as unknown as KeyboardEvent;
      component.handleInputValidation(event);
      expect(component.otpForm.value['0']).toBe('1');
    });
  
    it('should focus next field after number key press', () => {
      const event = { preventDefault: jest.fn(), key: '1', target: { id: 'otp-0' } } as unknown as KeyboardEvent;
      const spy = jest.spyOn(component, 'focusNextField');
      component.handleInputValidation(event);
      expect(spy).toHaveBeenCalledWith('0');
    });
  
  });


  describe('#resendOtp', () => {
    it('should reset the timer', () => {
      const spy = jest.spyOn(component, 'resetTimer');
      jest.spyOn(component["contextService"], 'getContext').mockReturnValue(of({
        view: 'otp',
        txId: '123'
      }));
      component.resendOtp();
      expect(spy).toHaveBeenCalled();
    });
  
    it('should call authentication service to resend OTP', () => {
      jest.spyOn(component["contextService"], 'getContext').mockReturnValue(of({
        view: 'otp',
        txId: '123'
      }));
      const serviceSpy = jest.spyOn(component["authenticationService"], 'resendOtp');
  
      component.resendOtp();
  
      expect(serviceSpy).toHaveBeenCalledWith('123');
    });
  
    it('should handle missing txId by resetting context', () => {
      const contextSpy = jest.spyOn(component["contextService"], 'setContext');
      jest.spyOn(component["contextService"], 'getContext').mockReturnValue(of({
        view: 'otp',
        txId: undefined
      }));
  
      component.resendOtp();
  
      expect(contextSpy).toHaveBeenCalledWith({
        txId: undefined, 
        view: 'login'
      });
    });
  
    it('should complete on first response', () => {
      jest.spyOn(component["contextService"], 'getContext').mockReturnValue(of({
        view: 'otp',
        txId: '6a601748-3b21-48b0-b0b6-146a364710f0'
      }));
      const serviceSpy = jest.spyOn(component["authenticationService"], 'resendOtp').mockReturnValue(of({
        code: 200,
        action: 'ok'
      }));
      component.resendOtp();
      expect(serviceSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('#resetTimer', () => {

    it('should set the timerSeconds to 30', () => {
      component.timerSeconds.next(10); 
      component.timerSeconds.subscribe((value) => {
        expect(value).toBe(30);
      });
      component.resetTimer();
    });
  
    it('should set the isResendTimerOn to true', () => {
      component.isResendTimerOn.next(false);
      component.isResendTimerOn.subscribe((value) => {
        expect(value).toBe(true);
      });
      component.resetTimer();
    });
  
    it('should enable resend button after 30 seconds', fakeAsync(() => {
      component.resetTimer();
      component.isResendTimerOn.pipe(takeLast(1)).subscribe((value) => {
        expect(value).toBe(false);
      });
      tick(30000);
    }));
  
    it('should decrement timerSeconds by 1 every second', fakeAsync(() => {
      component.resetTimer();
      component.timerSeconds.pipe(take(1)).subscribe((value) => {
        expect(value).toBe(30);
      });
      tick(1000);
      component.timerSeconds.pipe(take(1)).subscribe((value) => {
        expect(value).toBe(29);
      });
      tick(1000);
      component.timerSeconds.pipe(take(1)).subscribe((value) => {
        expect(value).toBe(28);
      });
      discardPeriodicTasks();
    }));
  
  });
  
  describe('#focusNextField', () => {

    it('should focus the next field', () => {
      document.getElementById = jest.fn().mockReturnValue({
        focus: jest.fn()
      } as unknown as HTMLElement);
  
      component.focusNextField('0');
  
      expect(document.getElementById).toHaveBeenCalledWith('otp-1');
      expect(document.getElementById('otp-1')!.focus).toHaveBeenCalled();
    });
  
    it('should wrap around to last field', () => {
      document.getElementById = jest.fn().mockReturnValue({
        focus: jest.fn()
      } as unknown as HTMLElement);
  
      component.focusNextField('5');
  
      expect(document.getElementById).toHaveBeenCalledWith('otp-5');
      expect(document.getElementById('otp-5')!.focus).toHaveBeenCalled();
    });
  
    it('should not focus out of bound fields', () => {
      document.getElementById = jest.fn().mockReturnValue(null);
  
      component.focusNextField('5');
  
      expect(document.getElementById).toHaveBeenCalledWith('otp-5');
      expect(document.getElementById).not.toHaveBeenCalledWith('otp-6');
    });
    
  });

  describe('#focusPreviousField', () => {

    it('should focus the previous field', () => {
      document.getElementById = jest.fn().mockReturnValue({
        focus: jest.fn()
      } as unknown as HTMLElement);
  
      component.focusPreviousField('1');
  
      expect(document.getElementById).toHaveBeenCalledWith('otp-0');
      expect(document.getElementById('otp-0')!.focus).toHaveBeenCalled();
    });
  
    it('should wrap around to first field', () => {
      document.getElementById = jest.fn().mockReturnValue({
        focus: jest.fn()
      } as unknown as HTMLElement);
  
      component.focusPreviousField('0');
  
      expect(document.getElementById).toHaveBeenCalledWith('otp-0');
      expect(document.getElementById('otp-0')!.focus).toHaveBeenCalled();
    });
  
    it('should not focus out of bound fields', () => {
      document.getElementById = jest.fn().mockReturnValue(null);
  
      component.focusPreviousField('0');
  
      expect(document.getElementById).toHaveBeenCalledWith('otp-0');
      expect(document.getElementById).not.toHaveBeenCalledWith('otp--1');
    });
    
  });

  describe('#handleValidateOtp', () => {
    it('should set loading to true', () => {
      component.handleValidateOtp();
      expect(component.loading).toBe(true);
    });

    it('should gracefuly ends if txId is not set', () => {
      component.otpForm.patchValue({0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6'});
      jest.spyOn(component, 'getLoginContext').mockReturnValue(of({txId: undefined, view: 'otp'}));
      jest.spyOn(component["contextService"], 'getContext').mockReturnValue(of({
        view: 'otp',
        txId: undefined
      }));
      component.handleValidateOtp();
    });

    it('should gracefuly ends if received post-authent action is invalid', () => {
      component.otpForm.patchValue({0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6'});
      jest.spyOn(component, 'getLoginContext').mockReturnValue(of(<Context>{txId: undefined, view: 'otp'}));
      jest.spyOn(component["contextService"], 'getContext').mockReturnValue(of({
        view: 'otp',
        txId: undefined
      }));
      jest.spyOn(component["authenticationService"], 'validateOtp').mockReturnValue(of({ code: 200, action: 'invalid' } as unknown as LocalAuthentResponse));
      component.handleValidateOtp();
    });
  
    it('should validate OTP with authentication service', () => {
      component.otpForm.setValue({0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6'});
      jest.spyOn(component["contextService"], 'getContext').mockReturnValue(of({txId: '123', view: 'otp'}));
      
      const validateSpy = jest.spyOn(component["authenticationService"], 'validateOtp');
  
      component.handleValidateOtp();
  
      expect(validateSpy).toHaveBeenCalledWith('123', '123456');
    });
  
    it('should handle invalid OTP input', () => {
      component.otpForm.setValue({0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: ''});
  
      component.handleValidateOtp();
  
      expect(component.errorMessage).toBe('Make sure to fill in all passcode fields.');
    });
  
    it('should handle login done event', () => {
      const dispatchSpy = jest.spyOn(component["contextService"], 'dispatchLoginDone');
      component.otpForm.patchValue({ 0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6' });
      jest.spyOn(component['authenticationService'], 'validateOtp').mockReturnValue(of({action: 'ok', code: 200}));
      jest.spyOn(component, 'getLoginContext').mockReturnValue(of({txId: '123', view: 'otp'}));
  
      component.handleValidateOtp();
  
      expect(dispatchSpy).toHaveBeenCalled();
    });
  
    it('should handle api error', () => {
      component.otpForm.patchValue({ 0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6' });
      jest.spyOn(component['authenticationService'], 'validateOtp').mockReturnValue(throwError({
        code: 500,
        message: 'API Error'
      }));
      jest.spyOn(component, 'getLoginContext').mockReturnValue(of({txId: '123', view: 'otp'}));
  
      component.handleValidateOtp();
  
      expect(component.errorMessage).toBe('API Error');
      expect(component.loading).toBe(false);
    });
  
  });
  
});
