import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdAccountComponent } from './bd-account.component';

describe('BdAccountComponent', () => {
  let component: BdAccountComponent;
  let fixture: ComponentFixture<BdAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
