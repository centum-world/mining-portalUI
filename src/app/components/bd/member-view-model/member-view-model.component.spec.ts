import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberViewModelComponent } from './member-view-model.component';

describe('MemberViewModelComponent', () => {
  let component: MemberViewModelComponent;
  let fixture: ComponentFixture<MemberViewModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberViewModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberViewModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
