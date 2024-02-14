import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RigIdComponent } from './rig-id.component';

describe('RigIdComponent', () => {
  let component: RigIdComponent;
  let fixture: ComponentFixture<RigIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RigIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RigIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
