import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerPayoutComponent } from './partner-payout.component';

describe('PartnerPayoutComponent', () => {
  let component: PartnerPayoutComponent;
  let fixture: ComponentFixture<PartnerPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
