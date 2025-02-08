import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperaciousuariComponent } from './recuperaciousuari.component';

describe('RecuperaciousuariComponent', () => {
  let component: RecuperaciousuariComponent;
  let fixture: ComponentFixture<RecuperaciousuariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperaciousuariComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperaciousuariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
