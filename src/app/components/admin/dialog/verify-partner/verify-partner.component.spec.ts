import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPartnerComponent } from './verify-partner.component';

describe('VerifyPartnerComponent', () => {
  let component: VerifyPartnerComponent;
  let fixture: ComponentFixture<VerifyPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
