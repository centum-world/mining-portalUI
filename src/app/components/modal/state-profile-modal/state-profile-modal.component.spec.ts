import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateProfileModalComponent } from './state-profile-modal.component';

describe('StateProfileModalComponent', () => {
  let component: StateProfileModalComponent;
  let fixture: ComponentFixture<StateProfileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateProfileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
