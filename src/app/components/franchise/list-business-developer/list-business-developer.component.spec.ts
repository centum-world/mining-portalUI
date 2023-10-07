import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBusinessDeveloperComponent } from './list-business-developer.component';

describe('ListBusinessDeveloperComponent', () => {
  let component: ListBusinessDeveloperComponent;
  let fixture: ComponentFixture<ListBusinessDeveloperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBusinessDeveloperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBusinessDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
