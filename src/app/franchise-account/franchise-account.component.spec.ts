import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseAccountComponent } from './franchise-account.component';

describe('FranchiseAccountComponent', () => {
  let component: FranchiseAccountComponent;
  let fixture: ComponentFixture<FranchiseAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
