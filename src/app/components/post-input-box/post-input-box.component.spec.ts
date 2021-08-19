import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostInputBoxComponent } from './post-input-box.component';

describe('PostInputBoxComponent', () => {
  let component: PostInputBoxComponent;
  let fixture: ComponentFixture<PostInputBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostInputBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostInputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
