import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAddBankComponent } from './business-add-bank.component';

describe('BusinessAddBankComponent', () => {
  let component: BusinessAddBankComponent;
  let fixture: ComponentFixture<BusinessAddBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAddBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAddBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
