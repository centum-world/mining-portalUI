import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAddLiquidityComponent } from './partner-add-liquidity.component';

describe('PartnerAddLiquidityComponent', () => {
  let component: PartnerAddLiquidityComponent;
  let fixture: ComponentFixture<PartnerAddLiquidityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerAddLiquidityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerAddLiquidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
