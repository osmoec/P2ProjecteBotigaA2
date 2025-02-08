import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperaciocontComponent } from './recuperaciocont.component';

describe('RecuperaciocontComponent', () => {
  let component: RecuperaciocontComponent;
  let fixture: ComponentFixture<RecuperaciocontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperaciocontComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperaciocontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
