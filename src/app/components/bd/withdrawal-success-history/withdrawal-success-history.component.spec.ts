import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalSuccessHistoryComponent } from './withdrawal-success-history.component';

describe('WithdrawalSuccessHistoryComponent', () => {
  let component: WithdrawalSuccessHistoryComponent;
  let fixture: ComponentFixture<WithdrawalSuccessHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalSuccessHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalSuccessHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
