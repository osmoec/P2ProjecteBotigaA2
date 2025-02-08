import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvicontrasenyaComponent } from './canvicontrasenya.component';

describe('CanvicontrasenyaComponent', () => {
  let component: CanvicontrasenyaComponent;
  let fixture: ComponentFixture<CanvicontrasenyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvicontrasenyaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvicontrasenyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
