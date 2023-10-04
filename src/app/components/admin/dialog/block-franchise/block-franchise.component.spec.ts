import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockFranchiseComponent } from './block-franchise.component';

describe('BlockFranchiseComponent', () => {
  let component: BlockFranchiseComponent;
  let fixture: ComponentFixture<BlockFranchiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockFranchiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockFranchiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
