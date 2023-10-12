import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BDpaymentRequestComponent } from './bdpayment-request.component';

describe('BDpaymentRequestComponent', () => {
  let component: BDpaymentRequestComponent;
  let fixture: ComponentFixture<BDpaymentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BDpaymentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BDpaymentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
