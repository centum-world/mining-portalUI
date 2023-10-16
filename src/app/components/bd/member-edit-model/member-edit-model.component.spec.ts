import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEditModelComponent } from './member-edit-model.component';

describe('MemberEditModelComponent', () => {
  let component: MemberEditModelComponent;
  let fixture: ComponentFixture<MemberEditModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberEditModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEditModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
