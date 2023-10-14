import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdProfileDocumentsComponent } from './bd-profile-documents.component';

describe('BdProfileDocumentsComponent', () => {
  let component: BdProfileDocumentsComponent;
  let fixture: ComponentFixture<BdProfileDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdProfileDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdProfileDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
