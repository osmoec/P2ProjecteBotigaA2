import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquestaSadisfacioClientsComponent } from './enquesta-sadisfacio-clients.component';

describe('EnquestaSadisfacioClientsComponent', () => {
  let component: EnquestaSadisfacioClientsComponent;
  let fixture: ComponentFixture<EnquestaSadisfacioClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquestaSadisfacioClientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquestaSadisfacioClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
