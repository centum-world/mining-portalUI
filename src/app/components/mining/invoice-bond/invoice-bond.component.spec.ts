import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceBondComponent } from './invoice-bond.component';

describe('InvoiceBondComponent', () => {
  let component: InvoiceBondComponent;
  let fixture: ComponentFixture<InvoiceBondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceBondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceBondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
