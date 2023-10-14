import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalRequestHistoryComponent } from './withdrawal-request-history.component';

describe('WithdrawalRequestHistoryComponent', () => {
  let component: WithdrawalRequestHistoryComponent;
  let fixture: ComponentFixture<WithdrawalRequestHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalRequestHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
