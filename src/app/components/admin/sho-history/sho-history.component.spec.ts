import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoHistoryComponent } from './sho-history.component';

describe('ShoHistoryComponent', () => {
  let component: ShoHistoryComponent;
  let fixture: ComponentFixture<ShoHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
