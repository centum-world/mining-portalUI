import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockShoComponent } from './block-sho.component';

describe('BlockShoComponent', () => {
  let component: BlockShoComponent;
  let fixture: ComponentFixture<BlockShoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockShoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockShoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
