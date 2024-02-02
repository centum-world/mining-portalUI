import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFranchiseComponent } from './signup-franchise.component';

describe('SignupFranchiseComponent', () => {
  let component: SignupFranchiseComponent;
  let fixture: ComponentFixture<SignupFranchiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupFranchiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFranchiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
