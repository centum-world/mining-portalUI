import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdDashboardComponent } from './bd-dashboard.component';

describe('BdDashboardComponent', () => {
  let component: BdDashboardComponent;
  let fixture: ComponentFixture<BdDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
