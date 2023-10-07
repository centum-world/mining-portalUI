import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberApprovedWithdrawalHistoryComponent } from './member-approved-withdrawal-history.component';

describe('MemberApprovedWithdrawalHistoryComponent', () => {
  let component: MemberApprovedWithdrawalHistoryComponent;
  let fixture: ComponentFixture<MemberApprovedWithdrawalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberApprovedWithdrawalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberApprovedWithdrawalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
