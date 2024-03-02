import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAuthorizeComponent } from './confirm-authorize.component';

describe('ConfirmAuthorizeComponent', () => {
  let component: ConfirmAuthorizeComponent;
  let fixture: ComponentFixture<ConfirmAuthorizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmAuthorizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
