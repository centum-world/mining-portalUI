import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePartnersHistoryComponent } from './active-partners-history.component';

describe('ActivePartnersHistoryComponent', () => {
  let component: ActivePartnersHistoryComponent;
  let fixture: ComponentFixture<ActivePartnersHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePartnersHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePartnersHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
