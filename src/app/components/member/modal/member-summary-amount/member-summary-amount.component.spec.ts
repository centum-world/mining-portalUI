import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSummaryAmountComponent } from './member-summary-amount.component';

describe('MemberSummaryAmountComponent', () => {
  let component: MemberSummaryAmountComponent;
  let fixture: ComponentFixture<MemberSummaryAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberSummaryAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSummaryAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
