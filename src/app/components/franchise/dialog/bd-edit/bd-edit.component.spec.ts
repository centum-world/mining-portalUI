import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdEditComponent } from './bd-edit.component';

describe('BdEditComponent', () => {
  let component: BdEditComponent;
  let fixture: ComponentFixture<BdEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
