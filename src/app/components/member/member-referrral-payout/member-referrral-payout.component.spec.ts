import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberReferrralPayoutComponent } from './member-referrral-payout.component';

describe('MemberReferrralPayoutComponent', () => {
  let component: MemberReferrralPayoutComponent;
  let fixture: ComponentFixture<MemberReferrralPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberReferrralPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberReferrralPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
