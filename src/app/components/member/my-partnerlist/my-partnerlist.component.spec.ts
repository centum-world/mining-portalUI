import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPartnerlistComponent } from './my-partnerlist.component';

describe('MyPartnerlistComponent', () => {
  let component: MyPartnerlistComponent;
  let fixture: ComponentFixture<MyPartnerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPartnerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPartnerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
