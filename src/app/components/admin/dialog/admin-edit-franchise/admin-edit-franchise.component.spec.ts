import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditFranchiseComponent } from './admin-edit-franchise.component';

describe('AdminEditFranchiseComponent', () => {
  let component: AdminEditFranchiseComponent;
  let fixture: ComponentFixture<AdminEditFranchiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditFranchiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditFranchiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
