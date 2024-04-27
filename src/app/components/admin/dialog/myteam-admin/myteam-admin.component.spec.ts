import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyteamAdminComponent } from './myteam-admin.component';

describe('MyteamAdminComponent', () => {
  let component: MyteamAdminComponent;
  let fixture: ComponentFixture<MyteamAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyteamAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyteamAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
