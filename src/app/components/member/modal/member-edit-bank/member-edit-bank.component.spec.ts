import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEditBankComponent } from './member-edit-bank.component';

describe('MemberEditBankComponent', () => {
  let component: MemberEditBankComponent;
  let fixture: ComponentFixture<MemberEditBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberEditBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEditBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
