import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningSignupComponent } from './mining-signup.component';

describe('MiningSignupComponent', () => {
  let component: MiningSignupComponent;
  let fixture: ComponentFixture<MiningSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
