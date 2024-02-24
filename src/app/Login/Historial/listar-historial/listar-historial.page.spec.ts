import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarHistorialPage } from './listar-historial.page';

describe('ListarHistorialPage', () => {
  let component: ListarHistorialPage;
  let fixture: ComponentFixture<ListarHistorialPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListarHistorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
