import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmApprovedComponent } from './confirm-approved.component';

describe('ConfirmApprovedComponent', () => {
  let component: ConfirmApprovedComponent;
  let fixture: ComponentFixture<ConfirmApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
