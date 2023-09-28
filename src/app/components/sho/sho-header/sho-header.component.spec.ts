import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoHeaderComponent } from './sho-header.component';

describe('ShoHeaderComponent', () => {
  let component: ShoHeaderComponent;
  let fixture: ComponentFixture<ShoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
