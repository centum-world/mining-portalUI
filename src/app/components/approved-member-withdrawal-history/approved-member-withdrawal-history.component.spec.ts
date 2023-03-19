import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedMemberWithdrawalHistoryComponent } from './approved-member-withdrawal-history.component';

describe('ApprovedMemberWithdrawalHistoryComponent', () => {
  let component: ApprovedMemberWithdrawalHistoryComponent;
  let fixture: ComponentFixture<ApprovedMemberWithdrawalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedMemberWithdrawalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedMemberWithdrawalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
