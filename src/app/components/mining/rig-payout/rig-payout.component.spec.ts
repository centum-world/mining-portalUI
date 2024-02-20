import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RigPayoutComponent } from './rig-payout.component';

describe('RigPayoutComponent', () => {
  let component: RigPayoutComponent;
  let fixture: ComponentFixture<RigPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RigPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RigPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
