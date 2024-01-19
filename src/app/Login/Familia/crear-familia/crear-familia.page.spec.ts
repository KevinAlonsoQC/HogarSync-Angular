import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearFamiliaPage } from './crear-familia.page';

describe('CrearFamiliaPage', () => {
  let component: CrearFamiliaPage;
  let fixture: ComponentFixture<CrearFamiliaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearFamiliaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
