import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdVerifyComponent } from './bd-verify.component';

describe('BdVerifyComponent', () => {
  let component: BdVerifyComponent;
  let fixture: ComponentFixture<BdVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
