import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisSolicitudesArrendadorComponent } from './mis-solicitudes-arrendador.component';

describe('MisSolicitudesArrendadorComponent', () => {
  let component: MisSolicitudesArrendadorComponent;
  let fixture: ComponentFixture<MisSolicitudesArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisSolicitudesArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisSolicitudesArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
