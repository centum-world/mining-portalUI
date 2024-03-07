import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralupComponent } from './referralup.component';

describe('ReferralupComponent', () => {
  let component: ReferralupComponent;
  let fixture: ComponentFixture<ReferralupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
