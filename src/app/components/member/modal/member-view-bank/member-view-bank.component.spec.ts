import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberViewBankComponent } from './member-view-bank.component';

describe('MemberViewBankComponent', () => {
  let component: MemberViewBankComponent;
  let fixture: ComponentFixture<MemberViewBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberViewBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberViewBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
