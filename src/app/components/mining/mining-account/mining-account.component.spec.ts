import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningAccountComponent } from './mining-account.component';

describe('MiningAccountComponent', () => {
  let component: MiningAccountComponent;
  let fixture: ComponentFixture<MiningAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
