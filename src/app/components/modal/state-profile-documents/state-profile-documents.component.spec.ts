import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateProfileDocumentsComponent } from './state-profile-documents.component';

describe('StateProfileDocumentsComponent', () => {
  let component: StateProfileDocumentsComponent;
  let fixture: ComponentFixture<StateProfileDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateProfileDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateProfileDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
