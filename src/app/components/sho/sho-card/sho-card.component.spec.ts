import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoCardComponent } from './sho-card.component';

describe('ShoCardComponent', () => {
  let component: ShoCardComponent;
  let fixture: ComponentFixture<ShoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
