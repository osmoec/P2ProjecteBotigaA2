import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentComponent } from './pagament.component';

describe('PagamentComponent', () => {
  let component: PagamentComponent;
  let fixture: ComponentFixture<PagamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
