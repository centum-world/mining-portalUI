import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPayoutComponent } from './member-payout.component';

describe('MemberPayoutComponent', () => {
  let component: MemberPayoutComponent;
  let fixture: ComponentFixture<MemberPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
