import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalSuccessComponent } from './withdrawal-success.component';

describe('WithdrawalSuccessComponent', () => {
  let component: WithdrawalSuccessComponent;
  let fixture: ComponentFixture<WithdrawalSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
