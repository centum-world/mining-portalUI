import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseSignUpComponent } from './franchise-sign-up.component';

describe('FranchiseSignUpComponent', () => {
  let component: FranchiseSignUpComponent;
  let fixture: ComponentFixture<FranchiseSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
