import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseViewBankDetailsComponent } from './franchise-view-bank-details.component';

describe('FranchiseViewBankDetailsComponent', () => {
  let component: FranchiseViewBankDetailsComponent;
  let fixture: ComponentFixture<FranchiseViewBankDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseViewBankDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseViewBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
