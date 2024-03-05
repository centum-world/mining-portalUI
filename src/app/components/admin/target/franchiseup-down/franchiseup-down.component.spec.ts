import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseupDownComponent } from './franchiseup-down.component';

describe('FranchiseupDownComponent', () => {
  let component: FranchiseupDownComponent;
  let fixture: ComponentFixture<FranchiseupDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseupDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseupDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
