import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningDashboardComponent } from './mining-dashboard.component';

describe('MiningDashboardComponent', () => {
  let component: MiningDashboardComponent;
  let fixture: ComponentFixture<MiningDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
