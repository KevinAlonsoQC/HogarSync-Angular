import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarFamiliasPage } from './listar-familias.page';

describe('ListarFamiliasPage', () => {
  let component: ListarFamiliasPage;
  let fixture: ComponentFixture<ListarFamiliasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListarFamiliasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
