import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerTransactionHistoryComponent } from './partner-transaction-history.component';

describe('PartnerTransactionHistoryComponent', () => {
  let component: PartnerTransactionHistoryComponent;
  let fixture: ComponentFixture<PartnerTransactionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerTransactionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
