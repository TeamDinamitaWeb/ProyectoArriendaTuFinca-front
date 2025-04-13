import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUsuariosEliminadosComponent } from './ver-usuarios-eliminados.component';

describe('VerUsuariosEliminadosComponent', () => {
  let component: VerUsuariosEliminadosComponent;
  let fixture: ComponentFixture<VerUsuariosEliminadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerUsuariosEliminadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerUsuariosEliminadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
