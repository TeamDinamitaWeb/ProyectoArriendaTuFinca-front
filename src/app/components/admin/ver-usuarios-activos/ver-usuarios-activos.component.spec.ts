import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUsuariosActivosComponent } from './ver-usuarios-activos.component';

describe('VerUsuariosActivosComponent', () => {
  let component: VerUsuariosActivosComponent;
  let fixture: ComponentFixture<VerUsuariosActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerUsuariosActivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerUsuariosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
