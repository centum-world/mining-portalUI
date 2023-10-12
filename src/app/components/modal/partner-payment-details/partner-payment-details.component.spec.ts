import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerPaymentDetailsComponent } from './partner-payment-details.component';

describe('PartnerPaymentDetailsComponent', () => {
  let component: PartnerPaymentDetailsComponent;
  let fixture: ComponentFixture<PartnerPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
