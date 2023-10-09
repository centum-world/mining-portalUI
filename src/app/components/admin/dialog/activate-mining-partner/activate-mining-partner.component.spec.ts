import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateMiningPartnerComponent } from './activate-mining-partner.component';

describe('ActivateMiningPartnerComponent', () => {
  let component: ActivateMiningPartnerComponent;
  let fixture: ComponentFixture<ActivateMiningPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateMiningPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateMiningPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
