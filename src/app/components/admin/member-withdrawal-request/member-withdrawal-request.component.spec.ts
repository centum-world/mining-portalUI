import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberWithdrawalRequestComponent } from './member-withdrawal-request.component';

describe('MemberWithdrawalRequestComponent', () => {
  let component: MemberWithdrawalRequestComponent;
  let fixture: ComponentFixture<MemberWithdrawalRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberWithdrawalRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberWithdrawalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
