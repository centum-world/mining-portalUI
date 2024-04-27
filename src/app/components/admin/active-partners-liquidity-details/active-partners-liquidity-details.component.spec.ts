import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePartnersLiquidityDetailsComponent } from './active-partners-liquidity-details.component';

describe('ActivePartnersLiquidityDetailsComponent', () => {
  let component: ActivePartnersLiquidityDetailsComponent;
  let fixture: ComponentFixture<ActivePartnersLiquidityDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePartnersLiquidityDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePartnersLiquidityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
