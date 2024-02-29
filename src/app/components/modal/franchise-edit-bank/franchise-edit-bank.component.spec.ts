import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseEditBankComponent } from './franchise-edit-bank.component';

describe('FranchiseEditBankComponent', () => {
  let component: FranchiseEditBankComponent;
  let fixture: ComponentFixture<FranchiseEditBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseEditBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseEditBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
