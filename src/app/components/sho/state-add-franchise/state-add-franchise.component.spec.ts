import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAddFranchiseComponent } from './state-add-franchise.component';

describe('StateAddFranchiseComponent', () => {
  let component: StateAddFranchiseComponent;
  let fixture: ComponentFixture<StateAddFranchiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateAddFranchiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateAddFranchiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
