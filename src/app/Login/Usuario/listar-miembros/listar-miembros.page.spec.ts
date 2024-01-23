import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarMiembrosPage } from './listar-miembros.page';

describe('ListarMiembrosPage', () => {
  let component: ListarMiembrosPage;
  let fixture: ComponentFixture<ListarMiembrosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListarMiembrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
