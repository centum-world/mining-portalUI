import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAddBankComponent } from './member-add-bank.component';

describe('MemberAddBankComponent', () => {
  let component: MemberAddBankComponent;
  let fixture: ComponentFixture<MemberAddBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberAddBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAddBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
