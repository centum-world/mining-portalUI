import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerApprovedWithdrawalHistoryComponent } from './partner-approved-withdrawal-history.component';

describe('PartnerApprovedWithdrawalHistoryComponent', () => {
  let component: PartnerApprovedWithdrawalHistoryComponent;
  let fixture: ComponentFixture<PartnerApprovedWithdrawalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerApprovedWithdrawalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerApprovedWithdrawalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
