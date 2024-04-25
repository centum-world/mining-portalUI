import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPayoutHistoryComponent } from './my-payout-history.component';

describe('MyPayoutHistoryComponent', () => {
  let component: MyPayoutHistoryComponent;
  let fixture: ComponentFixture<MyPayoutHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPayoutHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPayoutHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
