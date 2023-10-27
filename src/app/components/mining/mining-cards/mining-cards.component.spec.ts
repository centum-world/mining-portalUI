import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningCardsComponent } from './mining-cards.component';

describe('MiningCardsComponent', () => {
  let component: MiningCardsComponent;
  let fixture: ComponentFixture<MiningCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
