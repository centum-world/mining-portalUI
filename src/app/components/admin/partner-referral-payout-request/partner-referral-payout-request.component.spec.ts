import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerReferralPayoutRequestComponent } from './partner-referral-payout-request.component';

describe('PartnerReferralPayoutRequestComponent', () => {
  let component: PartnerReferralPayoutRequestComponent;
  let fixture: ComponentFixture<PartnerReferralPayoutRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerReferralPayoutRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerReferralPayoutRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
