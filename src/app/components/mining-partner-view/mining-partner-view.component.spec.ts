import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningPartnerViewComponent } from './mining-partner-view.component';

describe('MiningPartnerViewComponent', () => {
  let component: MiningPartnerViewComponent;
  let fixture: ComponentFixture<MiningPartnerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningPartnerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningPartnerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
