import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfeguirProducteComponent } from './afeguir-producte.component';

describe('AfeguirProducteComponent', () => {
  let component: AfeguirProducteComponent;
  let fixture: ComponentFixture<AfeguirProducteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfeguirProducteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfeguirProducteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
