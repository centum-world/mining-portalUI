import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPromotionComponent } from './member-promotion.component';

describe('MemberPromotionComponent', () => {
  let component: MemberPromotionComponent;
  let fixture: ComponentFixture<MemberPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
