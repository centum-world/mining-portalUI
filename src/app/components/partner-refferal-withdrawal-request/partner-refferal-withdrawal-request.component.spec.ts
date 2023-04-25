import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerRefferalWithdrawalRequestComponent } from './partner-refferal-withdrawal-request.component';

describe('PartnerRefferalWithdrawalRequestComponent', () => {
  let component: PartnerRefferalWithdrawalRequestComponent;
  let fixture: ComponentFixture<PartnerRefferalWithdrawalRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerRefferalWithdrawalRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerRefferalWithdrawalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
