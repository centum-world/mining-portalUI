import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDevPartnerTeamComponent } from './business-dev-partner-team.component';

describe('BusinessDevPartnerTeamComponent', () => {
  let component: BusinessDevPartnerTeamComponent;
  let fixture: ComponentFixture<BusinessDevPartnerTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDevPartnerTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDevPartnerTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
