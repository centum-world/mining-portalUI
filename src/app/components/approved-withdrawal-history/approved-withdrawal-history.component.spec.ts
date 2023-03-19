import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedWithdrawalHistoryComponent } from './approved-withdrawal-history.component';

describe('ApprovedWithdrawalHistoryComponent', () => {
  let component: ApprovedWithdrawalHistoryComponent;
  let fixture: ComponentFixture<ApprovedWithdrawalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedWithdrawalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedWithdrawalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
