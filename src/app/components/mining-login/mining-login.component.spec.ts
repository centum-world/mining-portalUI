import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningLoginComponent } from './mining-login.component';

describe('MiningLoginComponent', () => {
  let component: MiningLoginComponent;
  let fixture: ComponentFixture<MiningLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
