import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisePartnerMyTeamComponent } from './franchise-partner-my-team.component';

describe('FranchisePartnerMyTeamComponent', () => {
  let component: FranchisePartnerMyTeamComponent;
  let fixture: ComponentFixture<FranchisePartnerMyTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchisePartnerMyTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchisePartnerMyTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
