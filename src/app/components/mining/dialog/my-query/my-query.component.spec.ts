import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQueryComponent } from './my-query.component';

describe('MyQueryComponent', () => {
  let component: MyQueryComponent;
  let fixture: ComponentFixture<MyQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
