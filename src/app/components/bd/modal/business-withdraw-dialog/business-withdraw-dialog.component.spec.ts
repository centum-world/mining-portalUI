import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessWithdrawDialogComponent } from './business-withdraw-dialog.component';

describe('BusinessWithdrawDialogComponent', () => {
  let component: BusinessWithdrawDialogComponent;
  let fixture: ComponentFixture<BusinessWithdrawDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessWithdrawDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessWithdrawDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
