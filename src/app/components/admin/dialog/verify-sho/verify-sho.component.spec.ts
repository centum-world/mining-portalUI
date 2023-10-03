import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyShoComponent } from './verify-sho.component';

describe('VerifyShoComponent', () => {
  let component: VerifyShoComponent;
  let fixture: ComponentFixture<VerifyShoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyShoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyShoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
