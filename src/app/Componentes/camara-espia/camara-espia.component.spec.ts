import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamaraEspiaComponent } from './camara-espia.component';

describe('CamaraEspiaComponent', () => {
  let component: CamaraEspiaComponent;
  let fixture: ComponentFixture<CamaraEspiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamaraEspiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamaraEspiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
