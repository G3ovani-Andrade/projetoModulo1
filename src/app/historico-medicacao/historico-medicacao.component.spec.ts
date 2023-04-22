import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoMedicacaoComponent } from './historico-medicacao.component';

describe('HistoricoMedicacaoComponent', () => {
  let component: HistoricoMedicacaoComponent;
  let fixture: ComponentFixture<HistoricoMedicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoMedicacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoMedicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
