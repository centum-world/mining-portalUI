import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendWithdrawalAmountComponent } from './send-withdrawal-amount.component';

describe('SendWithdrawalAmountComponent', () => {
  let component: SendWithdrawalAmountComponent;
  let fixture: ComponentFixture<SendWithdrawalAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendWithdrawalAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendWithdrawalAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
