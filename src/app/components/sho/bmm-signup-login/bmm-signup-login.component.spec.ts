import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmmSignupLoginComponent } from './bmm-signup-login.component';

describe('BmmSignupLoginComponent', () => {
  let component: BmmSignupLoginComponent;
  let fixture: ComponentFixture<BmmSignupLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmmSignupLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmmSignupLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
