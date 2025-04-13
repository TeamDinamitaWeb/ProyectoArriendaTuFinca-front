import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPropiedadComponent } from './post-propiedad.component';

describe('PostPropiedadComponent', () => {
  let component: PostPropiedadComponent;
  let fixture: ComponentFixture<PostPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostPropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
