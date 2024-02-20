import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RigBondComponent } from './rig-bond.component';

describe('RigBondComponent', () => {
  let component: RigBondComponent;
  let fixture: ComponentFixture<RigBondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RigBondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RigBondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
