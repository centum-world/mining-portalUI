import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyteamPartnerComponent } from './myteam-partner.component';

describe('MyteamPartnerComponent', () => {
  let component: MyteamPartnerComponent;
  let fixture: ComponentFixture<MyteamPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyteamPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyteamPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
