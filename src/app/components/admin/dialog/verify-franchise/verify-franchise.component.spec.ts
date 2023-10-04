import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyFranchiseComponent } from './verify-franchise.component';

describe('VerifyFranchiseComponent', () => {
  let component: VerifyFranchiseComponent;
  let fixture: ComponentFixture<VerifyFranchiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyFranchiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyFranchiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
