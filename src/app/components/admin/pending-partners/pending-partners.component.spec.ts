import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPartnersComponent } from './pending-partners.component';

describe('PendingPartnersComponent', () => {
  let component: PendingPartnersComponent;
  let fixture: ComponentFixture<PendingPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
