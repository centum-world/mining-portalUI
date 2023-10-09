import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdBlockComponent } from './bd-block.component';

describe('BdBlockComponent', () => {
  let component: BdBlockComponent;
  let fixture: ComponentFixture<BdBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
