import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseAddBankComponent } from './franchise-add-bank.component';

describe('FranchiseAddBankComponent', () => {
  let component: FranchiseAddBankComponent;
  let fixture: ComponentFixture<FranchiseAddBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseAddBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseAddBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
