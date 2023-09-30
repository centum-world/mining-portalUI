import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisedashboardComponent } from './franchisedashboard.component';

describe('FranchisedashboardComponent', () => {
  let component: FranchisedashboardComponent;
  let fixture: ComponentFixture<FranchisedashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchisedashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchisedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
