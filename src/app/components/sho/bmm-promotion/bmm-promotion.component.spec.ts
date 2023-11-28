import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmmPromotionComponent } from './bmm-promotion.component';

describe('BmmPromotionComponent', () => {
  let component: BmmPromotionComponent;
  let fixture: ComponentFixture<BmmPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmmPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmmPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
