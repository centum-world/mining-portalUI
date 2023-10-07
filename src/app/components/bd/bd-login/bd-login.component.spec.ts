import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdLoginComponent } from './bd-login.component';

describe('BdLoginComponent', () => {
  let component: BdLoginComponent;
  let fixture: ComponentFixture<BdLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
