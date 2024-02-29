import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateEditBankComponent } from './state-edit-bank.component';

describe('StateEditBankComponent', () => {
  let component: StateEditBankComponent;
  let fixture: ComponentFixture<StateEditBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateEditBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateEditBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
