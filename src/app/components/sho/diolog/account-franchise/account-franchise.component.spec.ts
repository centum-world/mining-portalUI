import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFranchiseComponent } from './account-franchise.component';

describe('AccountFranchiseComponent', () => {
  let component: AccountFranchiseComponent;
  let fixture: ComponentFixture<AccountFranchiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountFranchiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFranchiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
