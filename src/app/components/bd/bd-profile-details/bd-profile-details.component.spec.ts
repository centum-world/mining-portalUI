import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdProfileDetailsComponent } from './bd-profile-details.component';

describe('BdProfileDetailsComponent', () => {
  let component: BdProfileDetailsComponent;
  let fixture: ComponentFixture<BdProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdProfileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
