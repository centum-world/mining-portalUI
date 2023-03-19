import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerSuccessHistroyComponent } from './partner-success-histroy.component';

describe('PartnerSuccessHistroyComponent', () => {
  let component: PartnerSuccessHistroyComponent;
  let fixture: ComponentFixture<PartnerSuccessHistroyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerSuccessHistroyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerSuccessHistroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
