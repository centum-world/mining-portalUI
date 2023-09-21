import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatehandlerloginComponent } from './statehandlerlogin.component';

describe('StatehandlerloginComponent', () => {
  let component: StatehandlerloginComponent;
  let fixture: ComponentFixture<StatehandlerloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatehandlerloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatehandlerloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
