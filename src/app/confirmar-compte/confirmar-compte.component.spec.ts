import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarCompteComponent } from './confirmar-compte.component';

describe('ConfirmarCompteComponent', () => {
  let component: ConfirmarCompteComponent;
  let fixture: ComponentFixture<ConfirmarCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarCompteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
