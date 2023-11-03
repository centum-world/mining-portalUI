import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseTeamComponent } from './franchise-team.component';

describe('FranchiseTeamComponent', () => {
  let component: FranchiseTeamComponent;
  let fixture: ComponentFixture<FranchiseTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
