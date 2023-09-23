import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatedashboardComponent } from './statedashboard.component';

describe('StatedashboardComponent', () => {
  let component: StatedashboardComponent;
  let fixture: ComponentFixture<StatedashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatedashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
