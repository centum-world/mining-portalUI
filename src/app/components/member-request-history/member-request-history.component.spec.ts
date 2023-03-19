import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRequestHistoryComponent } from './member-request-history.component';

describe('MemberRequestHistoryComponent', () => {
  let component: MemberRequestHistoryComponent;
  let fixture: ComponentFixture<MemberRequestHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRequestHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
