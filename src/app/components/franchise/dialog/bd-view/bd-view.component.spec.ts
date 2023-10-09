import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdViewComponent } from './bd-view.component';

describe('BdViewComponent', () => {
  let component: BdViewComponent;
  let fixture: ComponentFixture<BdViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
