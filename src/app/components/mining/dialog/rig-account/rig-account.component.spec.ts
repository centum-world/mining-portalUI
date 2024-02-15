import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RigAccountComponent } from './rig-account.component';

describe('RigAccountComponent', () => {
  let component: RigAccountComponent;
  let fixture: ComponentFixture<RigAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RigAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RigAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
