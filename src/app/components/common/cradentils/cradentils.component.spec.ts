import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CradentilsComponent } from './cradentils.component';

describe('CradentilsComponent', () => {
  let component: CradentilsComponent;
  let fixture: ComponentFixture<CradentilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CradentilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CradentilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
