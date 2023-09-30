import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateViewBankDetailsComponent } from './state-view-bank-details.component';

describe('StateViewBankDetailsComponent', () => {
  let component: StateViewBankDetailsComponent;
  let fixture: ComponentFixture<StateViewBankDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateViewBankDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateViewBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
