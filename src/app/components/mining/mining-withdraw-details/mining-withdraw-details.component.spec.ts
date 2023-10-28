import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningWithdrawDetailsComponent } from './mining-withdraw-details.component';

describe('MiningWithdrawDetailsComponent', () => {
  let component: MiningWithdrawDetailsComponent;
  let fixture: ComponentFixture<MiningWithdrawDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningWithdrawDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningWithdrawDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
