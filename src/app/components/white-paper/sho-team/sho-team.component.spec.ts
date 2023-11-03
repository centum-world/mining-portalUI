import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoTeamComponent } from './sho-team.component';

describe('ShoTeamComponent', () => {
  let component: ShoTeamComponent;
  let fixture: ComponentFixture<ShoTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
