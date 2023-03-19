import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningProfileDetailsComponent } from './mining-profile-details.component';

describe('MiningProfileDetailsComponent', () => {
  let component: MiningProfileDetailsComponent;
  let fixture: ComponentFixture<MiningProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningProfileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
