import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDocumentsDetailsComponent } from './member-documents-details.component';

describe('MemberDocumentsDetailsComponent', () => {
  let component: MemberDocumentsDetailsComponent;
  let fixture: ComponentFixture<MemberDocumentsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDocumentsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDocumentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
