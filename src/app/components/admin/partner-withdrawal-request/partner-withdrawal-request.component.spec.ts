import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerWithdrawalRequestComponent } from './partner-withdrawal-request.component';

describe('PartnerWithdrawalRequestComponent', () => {
  let component: PartnerWithdrawalRequestComponent;
  let fixture: ComponentFixture<PartnerWithdrawalRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerWithdrawalRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerWithdrawalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
