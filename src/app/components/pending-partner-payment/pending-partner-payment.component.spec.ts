import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPartnerPaymentComponent } from './pending-partner-payment.component';

describe('PendingPartnerPaymentComponent', () => {
  let component: PendingPartnerPaymentComponent;
  let fixture: ComponentFixture<PendingPartnerPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingPartnerPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPartnerPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
