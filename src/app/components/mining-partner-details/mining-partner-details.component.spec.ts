import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningPartnerDetailsComponent } from './mining-partner-details.component';

describe('MiningPartnerDetailsComponent', () => {
  let component: MiningPartnerDetailsComponent;
  let fixture: ComponentFixture<MiningPartnerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningPartnerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningPartnerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
