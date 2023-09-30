import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseHeaderComponent } from './franchise-header.component';

describe('FranchiseHeaderComponent', () => {
  let component: FranchiseHeaderComponent;
  let fixture: ComponentFixture<FranchiseHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
