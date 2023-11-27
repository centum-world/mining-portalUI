import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmmPartnerlistComponent } from './bmm-partnerlist.component';

describe('BmmPartnerlistComponent', () => {
  let component: BmmPartnerlistComponent;
  let fixture: ComponentFixture<BmmPartnerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmmPartnerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmmPartnerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
