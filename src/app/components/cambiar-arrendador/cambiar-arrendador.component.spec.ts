import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarArrendadorComponent } from './cambiar-arrendador.component';

describe('CambiarArrendadorComponent', () => {
  let component: CambiarArrendadorComponent;
  let fixture: ComponentFixture<CambiarArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambiarArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
