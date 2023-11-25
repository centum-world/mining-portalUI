import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoReferralPayoutComponent } from './sho-referral-payout.component';

describe('ShoReferralPayoutComponent', () => {
  let component: ShoReferralPayoutComponent;
  let fixture: ComponentFixture<ShoReferralPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoReferralPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoReferralPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
