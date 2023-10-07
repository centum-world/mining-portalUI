import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerReferralPayoutApprovedComponent } from './partner-referral-payout-approved.component';

describe('PartnerReferralPayoutApprovedComponent', () => {
  let component: PartnerReferralPayoutApprovedComponent;
  let fixture: ComponentFixture<PartnerReferralPayoutApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerReferralPayoutApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerReferralPayoutApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
