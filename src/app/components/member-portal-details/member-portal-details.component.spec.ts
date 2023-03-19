import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPortalDetailsComponent } from './member-portal-details.component';

describe('MemberPortalDetailsComponent', () => {
  let component: MemberPortalDetailsComponent;
  let fixture: ComponentFixture<MemberPortalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPortalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPortalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
