import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningViewBankComponent } from './mining-view-bank.component';

describe('MiningViewBankComponent', () => {
  let component: MiningViewBankComponent;
  let fixture: ComponentFixture<MiningViewBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningViewBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningViewBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
