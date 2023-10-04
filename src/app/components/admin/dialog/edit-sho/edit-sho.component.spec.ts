import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShoComponent } from './edit-sho.component';

describe('EditShoComponent', () => {
  let component: EditShoComponent;
  let fixture: ComponentFixture<EditShoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
