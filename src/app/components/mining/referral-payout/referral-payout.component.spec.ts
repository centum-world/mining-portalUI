import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralPayoutComponent } from './referral-payout.component';

describe('ReferralPayoutComponent', () => {
  let component: ReferralPayoutComponent;
  let fixture: ComponentFixture<ReferralPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
