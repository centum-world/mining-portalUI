import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfileDetailsComponent } from './member-profile-details.component';

describe('MemberProfileDetailsComponent', () => {
  let component: MemberProfileDetailsComponent;
  let fixture: ComponentFixture<MemberProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberProfileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
