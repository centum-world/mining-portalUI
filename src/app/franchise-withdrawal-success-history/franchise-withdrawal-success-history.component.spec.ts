import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseWithdrawalSuccessHistoryComponent } from './franchise-withdrawal-success-history.component';

describe('FranchiseWithdrawalSuccessHistoryComponent', () => {
  let component: FranchiseWithdrawalSuccessHistoryComponent;
  let fixture: ComponentFixture<FranchiseWithdrawalSuccessHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseWithdrawalSuccessHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseWithdrawalSuccessHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
