import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAddBankComponent } from './state-add-bank.component';

describe('StateAddBankComponent', () => {
  let component: StateAddBankComponent;
  let fixture: ComponentFixture<StateAddBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateAddBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateAddBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
