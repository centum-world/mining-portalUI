import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningAddBankComponent } from './mining-add-bank.component';

describe('MiningAddBankComponent', () => {
  let component: MiningAddBankComponent;
  let fixture: ComponentFixture<MiningAddBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningAddBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningAddBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
