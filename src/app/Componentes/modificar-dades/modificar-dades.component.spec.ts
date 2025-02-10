import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDadesComponent } from './modificar-dades.component';

describe('ModificarDadesComponent', () => {
  let component: ModificarDadesComponent;
  let fixture: ComponentFixture<ModificarDadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarDadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarDadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
