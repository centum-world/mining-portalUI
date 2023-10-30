import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerMyteamAccountComponent } from './partner-myteam-account.component';

describe('PartnerMyteamAccountComponent', () => {
  let component: PartnerMyteamAccountComponent;
  let fixture: ComponentFixture<PartnerMyteamAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerMyteamAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerMyteamAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
