import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseReferralComponent } from './franchise-referral.component';

describe('FranchiseReferralComponent', () => {
  let component: FranchiseReferralComponent;
  let fixture: ComponentFixture<FranchiseReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
