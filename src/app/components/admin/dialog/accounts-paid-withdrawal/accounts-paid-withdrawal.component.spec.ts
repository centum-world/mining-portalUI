import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsPaidWithdrawalComponent } from './accounts-paid-withdrawal.component';

describe('AccountsPaidWithdrawalComponent', () => {
  let component: AccountsPaidWithdrawalComponent;
  let fixture: ComponentFixture<AccountsPaidWithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsPaidWithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsPaidWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
