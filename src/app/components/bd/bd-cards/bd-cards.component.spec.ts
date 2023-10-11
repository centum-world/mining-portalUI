import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdCardsComponent } from './bd-cards.component';

describe('BdCardsComponent', () => {
  let component: BdCardsComponent;
  let fixture: ComponentFixture<BdCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
