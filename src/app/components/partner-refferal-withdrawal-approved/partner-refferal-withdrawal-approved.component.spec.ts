import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerRefferalWithdrawalApprovedComponent } from './partner-refferal-withdrawal-approved.component';

describe('PartnerRefferalWithdrawalApprovedComponent', () => {
  let component: PartnerRefferalWithdrawalApprovedComponent;
  let fixture: ComponentFixture<PartnerRefferalWithdrawalApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerRefferalWithdrawalApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerRefferalWithdrawalApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
