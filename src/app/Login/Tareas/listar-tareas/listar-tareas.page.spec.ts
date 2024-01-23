import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarTareasPage } from './listar-tareas.page';

describe('ListarTareasPage', () => {
  let component: ListarTareasPage;
  let fixture: ComponentFixture<ListarTareasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListarTareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
