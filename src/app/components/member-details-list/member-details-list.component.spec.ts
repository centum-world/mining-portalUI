import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsListComponent } from './member-details-list.component';

describe('MemberDetailsListComponent', () => {
  let component: MemberDetailsListComponent;
  let fixture: ComponentFixture<MemberDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
