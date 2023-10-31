import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatePartnerMyTeamComponent } from './state-partner-my-team.component';

describe('StatePartnerMyTeamComponent', () => {
  let component: StatePartnerMyTeamComponent;
  let fixture: ComponentFixture<StatePartnerMyTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatePartnerMyTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatePartnerMyTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
