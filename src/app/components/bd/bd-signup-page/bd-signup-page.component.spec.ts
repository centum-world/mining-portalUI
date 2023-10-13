import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdSignupPageComponent } from './bd-signup-page.component';

describe('BdSignupPageComponent', () => {
  let component: BdSignupPageComponent;
  let fixture: ComponentFixture<BdSignupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdSignupPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdSignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
