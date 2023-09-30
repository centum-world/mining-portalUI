import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseProfileDocumentsComponent } from './franchise-profile-documents.component';

describe('FranchiseProfileDocumentsComponent', () => {
  let component: FranchiseProfileDocumentsComponent;
  let fixture: ComponentFixture<FranchiseProfileDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseProfileDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseProfileDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
