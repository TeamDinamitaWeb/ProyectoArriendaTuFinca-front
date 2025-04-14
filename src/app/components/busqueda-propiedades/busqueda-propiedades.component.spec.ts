import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPropiedadesComponent } from './busqueda-propiedades.component';

describe('BusquedaPropiedadesComponent', () => {
  let component: BusquedaPropiedadesComponent;
  let fixture: ComponentFixture<BusquedaPropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaPropiedadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
