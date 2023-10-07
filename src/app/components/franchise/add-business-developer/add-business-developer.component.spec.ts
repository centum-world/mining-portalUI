import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusinessDeveloperComponent } from './add-business-developer.component';

describe('AddBusinessDeveloperComponent', () => {
  let component: AddBusinessDeveloperComponent;
  let fixture: ComponentFixture<AddBusinessDeveloperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBusinessDeveloperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBusinessDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
