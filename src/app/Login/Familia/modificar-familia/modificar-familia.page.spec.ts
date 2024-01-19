import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarFamiliaPage } from './modificar-familia.page';

describe('ModificarFamiliaPage', () => {
  let component: ModificarFamiliaPage;
  let fixture: ComponentFixture<ModificarFamiliaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarFamiliaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
