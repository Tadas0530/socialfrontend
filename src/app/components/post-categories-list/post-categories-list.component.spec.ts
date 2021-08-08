import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCategoriesListComponent } from './post-categories-list.component';

describe('PostCategoriesListComponent', () => {
  let component: PostCategoriesListComponent;
  let fixture: ComponentFixture<PostCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCategoriesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
