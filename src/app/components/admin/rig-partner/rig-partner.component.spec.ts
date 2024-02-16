import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RigPartnerComponent } from './rig-partner.component';

describe('RigPartnerComponent', () => {
  let component: RigPartnerComponent;
  let fixture: ComponentFixture<RigPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RigPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RigPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
