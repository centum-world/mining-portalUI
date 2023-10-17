import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseWithdrawalRequestComponent } from './franchise-withdrawal-request.component';

describe('FranchiseWithdrawalRequestComponent', () => {
  let component: FranchiseWithdrawalRequestComponent;
  let fixture: ComponentFixture<FranchiseWithdrawalRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseWithdrawalRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseWithdrawalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
