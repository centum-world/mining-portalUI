import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockMiningPartnerComponent } from './block-mining-partner.component';

describe('BlockMiningPartnerComponent', () => {
  let component: BlockMiningPartnerComponent;
  let fixture: ComponentFixture<BlockMiningPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockMiningPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockMiningPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
