import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseHistoryComponentComponent } from './franchise-history-component.component';

describe('FranchiseHistoryComponentComponent', () => {
  let component: FranchiseHistoryComponentComponent;
  let fixture: ComponentFixture<FranchiseHistoryComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseHistoryComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseHistoryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
