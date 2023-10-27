import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningSidebarComponent } from './mining-sidebar.component';

describe('MiningSidebarComponent', () => {
  let component: MiningSidebarComponent;
  let fixture: ComponentFixture<MiningSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
