import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberVerifyModelComponent } from './member-verify-model.component';

describe('MemberVerifyModelComponent', () => {
  let component: MemberVerifyModelComponent;
  let fixture: ComponentFixture<MemberVerifyModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberVerifyModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberVerifyModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
