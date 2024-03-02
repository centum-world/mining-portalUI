import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBankComponent } from './all-bank.component';

describe('AllBankComponent', () => {
  let component: AllBankComponent;
  let fixture: ComponentFixture<AllBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
