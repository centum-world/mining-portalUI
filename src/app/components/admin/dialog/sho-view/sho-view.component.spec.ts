import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoViewComponent } from './sho-view.component';

describe('ShoViewComponent', () => {
  let component: ShoViewComponent;
  let fixture: ComponentFixture<ShoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
