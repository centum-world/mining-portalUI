import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningEditAndViewBankComponent } from './mining-edit-and-view-bank.component';

describe('MiningEditAndViewBankComponent', () => {
  let component: MiningEditAndViewBankComponent;
  let fixture: ComponentFixture<MiningEditAndViewBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningEditAndViewBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningEditAndViewBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
