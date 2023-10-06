import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberWalletHistoryComponent } from './member-wallet-history.component';

describe('MemberWalletHistoryComponent', () => {
  let component: MemberWalletHistoryComponent;
  let fixture: ComponentFixture<MemberWalletHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberWalletHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberWalletHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
