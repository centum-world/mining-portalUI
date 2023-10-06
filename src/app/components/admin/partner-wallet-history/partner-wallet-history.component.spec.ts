import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerWalletHistoryComponent } from './partner-wallet-history.component';

describe('PartnerWalletHistoryComponent', () => {
  let component: PartnerWalletHistoryComponent;
  let fixture: ComponentFixture<PartnerWalletHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerWalletHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerWalletHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
