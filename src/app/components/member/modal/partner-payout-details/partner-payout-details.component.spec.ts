import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerPayoutDetailsComponent } from './partner-payout-details.component';

describe('PartnerPayoutDetailsComponent', () => {
  let component: PartnerPayoutDetailsComponent;
  let fixture: ComponentFixture<PartnerPayoutDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerPayoutDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerPayoutDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
