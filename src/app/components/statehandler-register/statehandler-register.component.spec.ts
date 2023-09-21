import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatehandlerRegisterComponent } from './statehandler-register.component';

describe('StatehandlerRegisterComponent', () => {
  let component: StatehandlerRegisterComponent;
  let fixture: ComponentFixture<StatehandlerRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatehandlerRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatehandlerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
