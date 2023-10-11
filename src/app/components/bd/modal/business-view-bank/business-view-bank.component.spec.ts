import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessViewBankComponent } from './business-view-bank.component';

describe('BusinessViewBankComponent', () => {
  let component: BusinessViewBankComponent;
  let fixture: ComponentFixture<BusinessViewBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessViewBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessViewBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
