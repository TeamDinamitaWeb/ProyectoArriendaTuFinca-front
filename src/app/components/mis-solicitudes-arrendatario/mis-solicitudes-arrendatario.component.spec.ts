import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisSolicitudesArrendatarioComponent } from './mis-solicitudes-arrendatario.component';

describe('MisSolicitudesArrendatarioComponent', () => {
  let component: MisSolicitudesArrendatarioComponent;
  let fixture: ComponentFixture<MisSolicitudesArrendatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisSolicitudesArrendatarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisSolicitudesArrendatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
