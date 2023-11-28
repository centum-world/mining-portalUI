import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchisePromotionComponent } from './franchise-promotion.component';

describe('FranchisePromotionComponent', () => {
  let component: FranchisePromotionComponent;
  let fixture: ComponentFixture<FranchisePromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchisePromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchisePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
