import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutEachmonthsComponent } from './payout-eachmonths.component';

describe('PayoutEachmonthsComponent', () => {
  let component: PayoutEachmonthsComponent;
  let fixture: ComponentFixture<PayoutEachmonthsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutEachmonthsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutEachmonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
