import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutReferralComponent } from './payout-referral.component';

describe('PayoutReferralComponent', () => {
  let component: PayoutReferralComponent;
  let fixture: ComponentFixture<PayoutReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
