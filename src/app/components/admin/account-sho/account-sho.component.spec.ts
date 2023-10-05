import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountShoComponent } from './account-sho.component';

describe('AccountShoComponent', () => {
  let component: AccountShoComponent;
  let fixture: ComponentFixture<AccountShoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountShoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountShoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
