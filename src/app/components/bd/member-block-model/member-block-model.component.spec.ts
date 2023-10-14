import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBlockModelComponent } from './member-block-model.component';

describe('MemberBlockModelComponent', () => {
  let component: MemberBlockModelComponent;
  let fixture: ComponentFixture<MemberBlockModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberBlockModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberBlockModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
