import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseProfileDetailsComponent } from './franchise-profile-details.component';

describe('FranchiseProfileDetailsComponent', () => {
  let component: FranchiseProfileDetailsComponent;
  let fixture: ComponentFixture<FranchiseProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseProfileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
