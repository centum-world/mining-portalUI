import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayTransactionHistoryComponent } from './today-transaction-history.component';

describe('TodayTransactionHistoryComponent', () => {
  let component: TodayTransactionHistoryComponent;
  let fixture: ComponentFixture<TodayTransactionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayTransactionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
