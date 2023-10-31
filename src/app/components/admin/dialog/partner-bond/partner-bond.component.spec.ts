import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerBondComponent } from './partner-bond.component';

describe('PartnerBondComponent', () => {
  let component: PartnerBondComponent;
  let fixture: ComponentFixture<PartnerBondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerBondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerBondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
