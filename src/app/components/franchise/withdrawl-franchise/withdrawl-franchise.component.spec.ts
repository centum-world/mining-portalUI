import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawlFranchiseComponent } from './withdrawl-franchise.component';

describe('WithdrawlFranchiseComponent', () => {
  let component: WithdrawlFranchiseComponent;
  let fixture: ComponentFixture<WithdrawlFranchiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawlFranchiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawlFranchiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
