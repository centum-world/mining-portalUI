import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdListComponent } from './bd-list.component';

describe('BdListComponent', () => {
  let component: BdListComponent;
  let fixture: ComponentFixture<BdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
