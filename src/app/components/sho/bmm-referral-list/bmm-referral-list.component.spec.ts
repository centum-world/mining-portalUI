import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmmReferralListComponent } from './bmm-referral-list.component';

describe('BmmReferralListComponent', () => {
  let component: BmmReferralListComponent;
  let fixture: ComponentFixture<BmmReferralListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmmReferralListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmmReferralListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
